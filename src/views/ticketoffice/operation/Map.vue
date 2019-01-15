<template>
    <div v-if="isAuthenticated">
        <span v-if="showClientAdd">
            <client-add needCPF="true" needRG="false" needPhone="true" needName="true" needCardBin="false" showCardBin="false"></client-add>
        </span>
        <span v-if="!showClientAdd">
            <b-tooltip target="header_next" placement="top">
                <span v-if="selected.length>0">
                    Assentos selecionados:
                    <ul>
                        <li v-for="(item, index) in selected" v-bind:key="index">
                            {{ item.sector }}: {{ item.name }}
                        </li>
                    </ul>
                </span>
            </b-tooltip>
            <div id="mapa_de_plateia" :style="{
                'max-width': ( map.width - 10 )+ 'px', 'min-height': map.height + 'px', 'margin' : '0 0 20px'
            }" class="mapa_de_plateia" v-if="hasSeatNumber">
                <img :src="map.img" :height="map.height" :width="map.width" style="max-width: 880px; margin: 0 0 20px;"/>
            </div>
        </span>
    </div>
</template>

<script>
import Vue from 'vue';
import VueResource from "vue-resource";
import config from '@/config';
import $ from 'jquery';
import { func } from '@/functions';
import { funcOperation } from '../../../components/ticketoffice/services/functions';
import { eventService } from '../../../components/ticketoffice/services/event';
import { bookingService } from '../../../components/common/services/booking';
import { shoppingCartService } from '../../../components/ticketoffice/services/shoppingcart';
import { printService } from '../../../components/ticketoffice/services/print';
import clientAdd from '../Client';

export default {
    mixins: [func, funcOperation],
    components: {
        clientAdd: clientAdd
    },
    data () {
        return {
            nextURI: "/ticketoffice/sell",
            timers: {
                getSeats: null,
            },
            isMap: true,
            processing: false,
            showClientAdd: false,
            codCliente: null,
            codReserva: null,
            seats: [],
            selected: [],
            hasSeatNumber: false,
            maxSeatsAvailableToBuy: 0,
            indiceInProcess: [],
            map: {
                img: null,
                width: '660',
                height: '610'
            },
        }
    },
    methods: {
        showClient() {
            this.toffice_buttonNext(false, this.nextURI);
            this.showClientAdd = true;
        },
        hideClient() {
            this.showClientAdd = false;
            this.selected = [];
            this.toffice_buttonNext(this.selected.length>0, this.nextURI);
            this.getSeats();
        },
        createSeatSelectedObject(indice, sector, name) {
            return {
                indice: indice,
                sector: sector,
                name: name
            }
        },
        setSeats() {
            Vue.nextTick().then(response=> {
                if (this.showClientAdd)
                    return;
                
                let seatsFiltered = this.seats.filter(o => o.status != 'O' && o.status != 'C');
                for (let x in seatsFiltered) {
                    if (this.codCliente!=null && this.codCliente!="" && seatsFiltered[x].status == 'R' && seatsFiltered[x].codCliente != this.codCliente) continue;

                    if (seatsFiltered[x].Indice)
                        this.movSeat(this.createSeatSelectedObject(seatsFiltered[x].Indice, seatsFiltered[x].NomObjeto, seatsFiltered[x].NomSetor), false);                    
                }

                addSeatJS($("#mapa_de_plateia"), annotation, this.seats, this.chooseSeat, this.indiceInProcess, this.codCliente, this.codReserva);
                setup_without_touch();

                //mapa_de_plateia[0].removeAnnotations();
                //$mapa_de_plateia.addAnnotations(annotation, this.seats);
            });
        },
        movSeat(obj, tryShoppingCart) {
            let doShoppingCart = false;
            let add = false;

            if (typeof obj == "number" || typeof obj == "string") {
                let index = this.selected.map(function(e) { return e.indice; }).indexOf(obj);
                if (index!=-1)
                {
                    doShoppingCart = true;
                    if (this.selected.length == 1) {
                        this.selected = [];
                    }
                    else {
                        this.selected.splice(index, 1);
                    }                    
                }
            }
            else {
                let index = this.selected.map(function(e) { return e.indice; }).indexOf(obj.indice);
                if (index == -1) {
                    doShoppingCart = true;
                    add = true;
                    this.selected.push(obj);
                }
            }
            //console.log(this.selected.length);
            if (tryShoppingCart) {
                if (doShoppingCart) {
                    if (add) {
                        shoppingCartService.add(this.getLoggedId(), this.get_id_base(), "step2", this.operation.codPeca, this.operation.step1.id_apresentacao, obj.indice, 1, null, null, null, null).then(response=> {
                                if (this.validateJSON(response))
                                    this.toffice_buttonNext(this.selected.length>0, this.nextURI);
                            }
                            ,error=> { console.log(JSON.stringify(response));
                        });
                    }
                    else {
                        shoppingCartService.delByIndice(this.getLoggedId(), obj).then(response=> {
                                if (this.validateJSON(response))
                                    this.toffice_buttonNext(this.selected.length>0, this.nextURI);
                            }
                            ,error=> { console.log(JSON.stringify(response));
                        });
                    }
                }
            }
            else {
                this.toffice_buttonNext(this.selected.length>0, this.nextURI);
            }
        },
        reserveSeats(qtd) {
            this.showWaitAboveAll();
            bookingService.bookNotNumered(this.get_id_base(), this.operation.step1.id_apresentacao, this.getLoggedId(), parseInt(qtd), "").then(response=> {
                    this.hideWaitAboveAll();
                    if (this.validateJSON(response))
                    {
                        if (response.success == 0) {
                            this.popupError(response.message);
                        }
                        else {
                            this.$router.push(this.nextURI);
                        }
                    }
                }
                ,error=> {
                    this.hideWaitAboveAll();
                    this.toastError("Falha na execução.");
            });
        },
        chooseSeat(indice, name, sector, status) {
            this.toffice_buttonNext(false);
            this.indiceInProcess.push(indice);

            switch (status) {
                case "C":
                case "S":
                case "R":
                    bookingService.remove(this.get_id_base(), this.operation.step1.id_apresentacao, indice, this.getLoggedId()).then(response=> {
                            this.indiceInProcess.splice(this.indiceInProcess.indexOf(indice));
                            if (this.validateJSON(response))
                            {
                                if (response.success == 0) {
                                    this.popupError("Falha para remover o assento.");
                                }
                                else {
                                    this.movSeat(indice,true);

                                    this.toastSuccess("Assento removido.");
                                }
                            }

                            this.getSeats(false);
                        }
                        ,error=> {
                            this.toastError("Falha na execução.");
                    });
                break;
                default:
                    bookingService.book(this.get_id_base(), this.operation.step1.id_apresentacao, indice, this.getLoggedId(), "", this.codCliente, this.codReserva).then(response=> {
                            this.indiceInProcess.splice(this.indiceInProcess.indexOf(indice));
                            if (this.validateJSON(response))
                            {
                                if (response.success == 0) {
                                    this.popupError(response.message);
                                }
                                else {
                                    this.movSeat(this.createSeatSelectedObject(indice, sector, name), true);
                                    this.toastSuccess(response.message);
                                }
                            }
                            this.getSeats(false);
                        }
                        ,error=> {
                            this.toastError("Falha na execução.");
                    });
                break;
            }
        },
        setSeatsTimer() {
            this.timers.getSeats = setInterval(this.getSeats, 10000);
        },
        clearSeatsTimer() {
            clearInterval(this.timers.getSeats);
        },
        getSeats() {
            eventService.getSeats(this.get_id_base(), this.operation.step1.id_apresentacao, this.getLoggedId()).then(response=> {
                    if (this.validateJSON(response))
                    {
                        this.seats = response;
                        this.setSeats();
                    }
                }
                ,error=> {
                    this.toastError("Falha na execução.");
            });
        },
        seatNotNumered() {
            this.$swal({
                allowEscapeKey: false,
                allowOutsideClick: false,
                allowEnterKey: false,
                showCancelButton: true,
                confirmButtonText: 'Continuar',
                cancelButtonText: 'Cancelar',
                title: 'Quantidade?',
                input: 'number',
                inputPlaceholder: '1',
                inputAttributes: {
                    min: 1,
                    max: this.maxSeatsAvailableToBuy,
                    value: 1
                },
            }).then((result) => {
                if (result.value) {
                    this.reserveSeats(result.value);
                }
                else if (result.dismiss === this.$swal.DismissReason.cancel) {
                    this.$router.push("/ticketoffice/operation");
                }
            });

        },
        finishReservation() {
            this.$swal({
                allowEscapeKey: false,
                allowOutsideClick: false,
                allowEnterKey: false,
                showCancelButton: true,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
                title: 'Processo de reserva',
                text: "Deseja finalizar a reserva?",
            }).then((result) => {
                if (result.value) {
                    this.$swal({
                        type: 'success',
                        title: 'Processo de reserva',
                        text: `Reserva ${this.codReserva} efetuada com sucesso.`,
                    }).then((result2) => {
                        this.$swal({
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                            allowEnterKey: false,
                            showCancelButton: true,
                            confirmButtonText: 'Sim',
                            cancelButtonText: 'Não',
                            title: 'Impressão da reserva',
                            text: "Deseja Imprimir a reserva?",
                        }).then((result) => {
                            if (result.value) {
                                printService.booking(this.get_id_base(), this.codReserva, '');
                            }
                        });
                    }); 
                    this.getHeader().cancelingReservationProcess();
                    
                }
                else if (result.dismiss === this.$swal.DismissReason.cancel) {
                    this.toffice_buttonNext(true, this.nextURI);
                    this.gotoHome();
                }
            });
        },
    },
    created () {
        if (this.operation.step1.type == "sell")
            this.getHeader().initiatingSalesProcess();

        if (this.operation.step1.type == "reservation")
            this.getHeader().initiatingReservationProcess();
        
        this.toffice_buttonNext(this.selected.length>0, this.nextURI);
        this.setSeatsTimer();
        this.showWaitAboveAll();
        if (this.operation.step1.type == "reservation") {
            this.showClient();
            this.nextURI = "finishReservation";
        }

        eventService.getMap(this.get_id_base(), this.operation.step1.id_apresentacao).then(response=> {
                this.hideWaitAboveAll();
                if (this.validateJSON(response))
                {
                    if (response.seatsAvailable <= 0) {
                        this.$swal({
                            type: 'error',
                            text: "Não há assentos disponíveis para compra.",
                            showConfirmButton: true,
                        }).then((result) => {
                            this.$router.push("/ticketoffice/operation");
                        });
                        return;
                    }
                    this.maxSeatsAvailableToBuy = response.maxSeatsAvailableToBuy;
                    this.hasSeatNumber = response.IngressoNumerado == "1";
                    if (this.hasSeatNumber)
                    {
                        console.log(response);
                        this.map.img = response.FotoImagemSite;
                        this.map.width = parseInt(response.LarguraSite);
                        this.map.height = parseInt(response.AlturaSite);
                        this.getSeats(true);
                    }
                    else {
                        this.clearSeatsTimer();
                        this.seatNotNumered();
                    }
                }
            }
            ,error=> {
                this.hideWaitAboveAll();
                this.toastError("Falha na execução.");
        });
        window.addEventListener("beforeunload", function (e) {
/*            if (this.processing) {
                return undefined;
            var confirmationMessage = 'It looks like you have been editing something. '
                                    + 'If you leave before saving, your changes will be lost.';

            (e || window.event).returnValue = confirmationMessage; //Gecko + IE
            return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
            }*/
        });
    },
    computed: {
        operation() {
            return this.retrieve();
        }
    },
    beforeRouteLeave (to, from, next) {
        if (this.processing) {
            this.popupError("Estamos em processando, por favor aguarde.");
        }
        else {
            this.clearSeatsTimer();
            next();
        }
    }
}
    let opennedClass = 'open',
    standbyClass = 'standby',
    closedClass = 'closed',
    reservedClass = 'reserved',
    waitingClass = "waiting";
    let seatClickOut = null;
    let cc = null;
    let cr = null;

    function addSeatJS(obj, annotationCallback, annotations, callbackVue, inprocessclicked, codCliente, codReserva) {
        seatClickOut = callbackVue;
        cc = codCliente;
        cr = codReserva;
        
    //    debugger;
        var container = obj,
            containerHeight = $(container).height(),
            defaults = {
                xPosition: 'middle',
                yPosition: 'middle',
                height: containerHeight
            },
            options = $.extend(defaults, options);
        
        $.each(annotations, function() {
            var element = annotationCallback(this, inprocessclicked);
            
            element.css({position: 'absolute'});
            
            container.append(element);
            
            var left = (this.PosXSite * container.width()) - (xOffset(element,options.xPosition)),
                top = (this.PosYSite * options.height) - (yOffset(element,options.yPosition));
            
            if (this.width && this.height) {
                var width = (this.width * container.width()),
                    height = (this.height * container.height());
                
                element.css({width: width + 'px', height: height + 'px'});
            }
            
            element.css({ left: left + 'px', top: top + 'px'});
            
            $.each(this, function(key, val) {
                element.data(key, val);
            });
            element.attr('title', element.data('Indice') + element.data('NomObjeto') + ' | ' + element.data('NomSetor'));
            if (element.data('img')) element.attr('data-img', element.data('img'));
            //if (top > containerHeight) element.hide();
        });
    }


    function positionAtEvent(obj,event, xPosition, yPosition) {
		var container = $(obj).parent('div');
		
		$(obj).css('left', event.pageX - container.offset().left - ($(obj).xOffset(xPosition)) + 'px');
		$(obj).css('top', event.pageY - container.offset().top - ($(obj).yOffset(yPosition)) + 'px');
		$(obj).css('position', 'absolute');
	};

	function seralizeAnnotations (obj,xPosition, yPosition) {
		var annotations = [];
		
		obj.each(function(){
			var obj = {
				x: $(obj).relativeX(xPosition),
				y: $(obj).relativeY(yPosition),
				id: $(obj).data('id'),
				name: $(obj).data('name'),
				setor: $(obj).data('setor'),
				img: $(obj).data('img')
			};
			if ($(obj).data('new_img') != undefined) {
				obj.new_img = $(obj).data('new_img');
			}
			annotations.push(obj);
		});
		
		return annotations;
	};

	function relativeX (obj,xPosition) {
		var left = $(obj).coordinates().x + ($(obj).xOffset(xPosition)),
			width = $(obj).parent().width();
		
		return left / width;
	}

	function relativeY (obj,yPosition) {
		var top = $(obj).coordinates().y + ($(obj).yOffset(yPosition)),
			height = $(obj).parent().height();
			
		return top / height;
	}

	function relativeWidth (obj) {
		return $(obj).width() / $(obj).parent().width();
	}

	function relativeHeight (obj) {
		return $(obj).height() / $(obj).parent().height();
	}

	function xOffset (obj,xPosition) {
		switch (xPosition) {
			case 'left': return 0; break;
			case 'right': return $(obj).width(); break;
			default: return $(obj).width() / 2; // middle
		}
	};

	function yOffset (obj,yPosition) {
		switch (yPosition) {
			case 'top': return 0; break;
			case 'bottom': return $(obj).height(); break;
			default: return $(obj).height() / 2; // middle
		}
	};
	
	function coordinates (obj) {
		return {x: parseInt($(obj).css('left').replace('px', '')), y: parseInt($(obj).css('top').replace('px', ''))};
    };
    
    function annotation(obj, inprocessclicked) {
        let clicked = inprocessclicked.filter(indice => indice == obj.id).length>0;
        let withclass = opennedClass;
        if (clicked)
        {
            withclass = waitingClass;
        }
        else {
            switch (obj.status){
                case "O":
                    withclass = opennedClass;
                break;
                case "R":
                    withclass = closedClass;
                    if (obj.CodCliente !=null && cc != null && obj.CodCliente == cc)
                        withclass = reservedClass;
                break;
                case "C":
                    withclass = closedClass;
                break;
                default:
                    withclass = standbyClass;
                break;
            }
        }

        return $(document.createElement('span'))
        .attr('id', obj.id)
        .addClass('annotation')
        .addClass('diametro')
        .addClass(withclass);
    }
    function setup_without_touch() {
      $('#mapa_de_plateia span:not(.' + closedClass + ')').off('mouseenter mouseleave')
      .on('mouseenter mouseleave', function() {
        if (!$(this).hasClass('annotationHover') && !$(this).hasClass('annotationSelected')) {
          $(this).addClass('annotationHover');
        } else {
          $(this).removeClass('annotationHover');
        }
      });
      $('#mapa_de_plateia span:not(.' + closedClass + ')').off('click').on('click', span_click);
    }
    function span_click(e) {
        //debugger;
        var $this = $(e.target),
            objSerialized = '',
            action = ($this.hasClass(standbyClass)) ? 'delete' : 'add',
            quantidade;
            
        $.each($this.data(), function(key, val) {
            var exceptions = 'tooltip events handle x y status';
            if (exceptions.indexOf(key) == -1) {
            objSerialized += key + '=' + escape(val) + '&';
            }
        });
        if ($this.hasClass(waitingClass)){
            return;
        }
        if ($this.hasClass(closedClass)){
            //return;
        }
        //console.log($this.data());
        $this
        .removeClass(opennedClass)
        .removeClass(standbyClass)
        .removeClass(closedClass)
        .removeClass(reservedClass)
        .addClass(waitingClass);

        seatClickOut($this.data().Indice, $this.data().NomObjeto, $this.data().NomSetor, $this.data().status);

      /*
      $.ajax({
        url: 'atualizarPedido.php?action=' + action,
        data: objSerialized + $.serializeUrlVars(),
        type: 'post',
        success: function(data) {
          if (data.substr(0, 4) != 'true') {
            if (data.indexOf('?') != -1 && data.length != data.indexOf('?') + 1) {
              $.dialog({
                title: 'Aviso...',
                text: data.split('?')[1]
                });
                
              var ids = data.split('?');
              ids = ids[0].split('|');
                
              for (i = 0; i < ids.length; i++) {
                var $this = $('#' + ids[i]);
                statusCadeira($this, 'C');
              }
            } else {
              tratarResposta(data);
            }
          } else {
            var ids = data.split('?');
            ids = ids[1].split('|');
              
            for (i = 0; i < ids.length; i++) {
              var $this = $('#' + ids[i]);
              statusCadeira($this);
            }
          }
        //refreshCadeiras(false);
        }
      });
      */
    }

</script>

<style>
.annotation {
  width:10px;
  height:10px;
  cursor: pointer;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  background-color: #8cc63f;
}

.diametro{
  width:10px;
  height:10px;
}

.annotationHover {
  border:2px solid transparent;
  margin: -2px;
}

.annotationSelected {}

.open {}

.standby {
  background-color: #006837;    
}

.closed {
  background-color: #cccccc;
}

.reserved {
  background-color: #ffae00;
}

.waiting {
  background-color: #FF0;    
}

.mapa_de_plateia .ui-selecting {
  margin: -2px;
  border:2px solid #FF0;
}

.mapa_de_plateia .ui-selected {
  margin: -2px;
  border: 2px solid #F00;
}

.mapa_de_plateia {
    position:relative;
    float: none;
    margin: auto;
    max-width: 450px;
    max-height: 350px;
}
</style>
