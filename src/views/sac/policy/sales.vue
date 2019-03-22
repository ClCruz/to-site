<template>
<div>
  <div class="content" v-if="!newTemplate">
    <div class="row">
      <Logo></Logo>
      <div class="col-12 col-md-10 content__show">
        <div class="row">
          <!-- SAC Index -->
          <sacInfo></sacInfo>

          <!-- Show SAC content -->
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-12">

                <div class="content__description">
                  <div class="card event__card sac__card">
                  <h3 class="title__page">Politica de Venda</h3>
                  <p>

                    Antes de finalizar sua compra conheça as políticas e condições de venda da  {{siteName}}:
                    Melhor lugar disponível: ao comprar pela Internet, você pode escolher o melhor lugar
                    disponível de acordo com sua preferência, simultaneamente, como se estivesse na própria
                    bilheteria do evento, isso se o evento for com lugar demaarcado.
                    A compra estará sujeita à disponibilidade de ingressos e à aprovação da operadora de seu
                    cartão de crédito.
                  </p>
                  <p>
                    Ao comprar em nosso site ou call center sua compra poderá ficar sujeita à análise e
                    aprovação do nosso Departamento de Segurança. Analisando caso a caso, documentos
                    poderão ser solicitados ao titular da compra, que deverá encaminhá-los ao e-mail indicado e
                    dentro do prazo estipulado, para finalização e entrega do pedido, sob pena de cancelamento.
                    A fim de facilitar a análise do Departamento de Segurança e garantir a autenticidade de sua
                    compra, preencha todos os campos do cadastro, em especial nome completo, número de
                    CPF, e-mail, telefone para contato e endereço.
                  </p>
                  <p>
                    Os ingressos adquiridos através dos canais de venda da  {{siteName}} poderão estar sujeitos ao
                    acréscimo da taxa de conveniência por ingresso, bem como da taxa de entrega por pedido no
                    caso de entrega em domicílio ou local de trabalho do cliente.
                    As nossas taxas de serviço são receitas exclusivas da  {{siteName}}, bem como o valor de face do
                    ingresso são receitas exclusivas do produtor do evento.
                  </p>
                  <p>
                    A Empresa comercializa seus ingressos de forma exclusiva. Para a segurança de nossos
                    Clientes, recomendamos que a compra dos ingressos seja feita somente pelos canais oficiais
                    de compra, disponíveis neste Website.
                  </p>
                  <p>
                    Não nos responsabilizamos por ingressos adquiridos em canais de venda não oficiais, seja
                    através de pessoa física, pessoa jurídica, outros Websites e comunidades na Internet, com
                    quem não possuímos qualquer vínculo.
                  </p>
                  <p>
                    Confira atentamente os dados de seu pedido (espetáculo, dia, horário, quantidades, setor)
                    antes da confirmação de sua compra. Não serão permitidos cancelamento, troca ou
                    devolução de ingressos. O seu ingresso é um produto único, ou seja, após sua compra ele
                    não estará mais disponível para venda.
                  </p>
                  <p>
                    Em caso de arrependimento do cliente, o reembolso do valor do ingresso será efetuado,
                    descontando as taxas de serviço (conveniência) e entrega (se houver), desde que esse direito
                    seja requisitado em até 7 (sete) dias da data da compra, e que seja em até 48 (quarenta e
                    oito) horas antes da data do espetáculo ou evento, sendo assim, para compras realizadas
                    próximo da data do evento, os ingressos só poderão ser cancelados em até 48 (quarenta e
                    oito) horas antes da data do evento.
                  </p>
                  <p>
                    Para ingressos adquiridos em ponto de venda e bilheteria, o estorno do valor pago somente
                    será efetuado após a apresentação física dos mesmos nos pontos de venda da  {{siteName}}. Este
                    procedimento não é necessário para e-ticket, mobile ticket e quando se tratar de evento
                    cancelado. Depois de confirmada a autenticidade do ingresso, a devolução dos valores pagos
                    seguirá o procedimento abaixo descrito, de acordo com a forma de pagamento utilizada:
                    Cartão de crédito: o estorno do valor será solicitado à operadora do cartão, que disponibilizará
                    o crédito em fatura seguinte ou subsequente.
                  </p>
                  <p>
                    Cartão de débito: o estorno do valor será solicitado à operadora do cartão utilizado na
                    compra, que creditará o valor em conta bancária vinculada ao cartão, em até 15 dias úteis.
                    Dinheiro: depósito bancário em até 20 dias úteis.
                  </p>
                  <p>
                    Informamos que os prazos discriminados nos itens 4.2.1 e 4.2.2, para estornos via cartão,
                    crédito ou débito, podem variar, de acordo com o fechamento de sua fatura e/ou seu banco
                    emissor.
                  </p>
                  <p>
                    Caso o consumidor ainda não tenha recebido seu ingresso, o cliente poderá exercer o direito
                    de arrependimento através da central de atendimento da  {{siteName}}, observadas as condições
                    aqui estipuladas.
                  </p>
                  <p>
                    Em casos de cancelamento do evento por parte da produção, os valores relativos às entregas
                    já efetuadas não serão devolvidos. 5. Para sua segurança, todas as compras, via telefone ou
                    internet, somente poderão ser entregues ao proprietário do cartão de crédito utilizado na
                    compra (o nome do titular do cartão deve ser o mesmo nome de cadastro do pedido na
                    internet), mediante a apresentação dos seguintes documentos: Cartão de Crédito original,
                    Documento de Identidade e senha personalizada de sua compra recebida após a confirmação
                    de seu pedido.
                  </p>
                  <p>
                    Nas hipóteses de venda de ingressos via telefone ou internet, o cliente poderá retirar os
                    ingressos adquiridos nos pontos de venda da  {{siteName}} somente após 48 horas da
                    data da compra e/ou liberação do pedido, ou no local do espetáculo ou evento em até 2
                    (duas) horas antes do seu início, sem a cobrança da taxa de entrega.
                    Para retirada dos ingressos em um de nossos pontos de venda, poderá ser requisitada a
                    apresentação também de cópia da fatura de seu cartão de crédito utilizado na compra
                    contendo nome do titular, número do cartão e endereço conforme cadastro. 5.3. O cliente
                    autoriza desde já o decalque do número do cartão de crédito no protocolo de entrega que
                    deverá ser assinado pelo cliente.
                  </p>
                  <p>
                    Para a prestação do serviço de entrega, se contratado no ato da compra, serão realizadas 02
                    (duas) tentativas em horário comercial (segunda à sexta-feira, das 8.00h às 18.00h). Em caso
                    de ausência do destinatário e/ou recebedor autorizado, os ingressos retornarão à Ingresso
                    Rápido e as tentativas poderão ser consultadas. Caso não seja possível a entrega nas 02
                    (duas) tentativas previstas, poderá ser solicitado uma terceira tentativa de entrega, mediante
                    o pagamento de nova taxa de envio, ou, se preferir, os ingressos ficarão disponíveis para
                    retirada na bilheteria, no dia e no local do evento, a partir de 2h antes do início do espetáculo.
                  </p>
                  <p>
                    A  {{siteName}} não se responsabiliza por endereços incompletos e/ou errados. Se ocorrer, os
                    ingressos retornarão à origem e se o cliente ainda desejar o serviço, será cobrado nova taxa
                    de envio ou, se preferir, os ingressos ficarão disponíveis para retirada na bilheteria, no dia e
                    no local do evento, a partir de 2h antes do início do espetáculo. Confira atentamente seu
                    cadastro.
                  </p>
                  <p>
                    Se o ingresso não for recebido em endereço solicitado em até 48hs antes do evento, contate
                    a  {{siteName}} através de seus canais de atendimento, informados neste site.
                    Após a retirada ou recebimento dos ingressos, os mesmos são de responsabilidade do
                    Cliente. Caso sejam perdidos, roubados ou danificados, não será possível solicitar sua
                    reimpressão.
                  </p>
                  <p>
                    Meia-Entrada: a compra de meia-entrada e/ou outros descontos estará sujeita a regras do
                    produtor de cada evento ou casa de espetáculo.
                  </p>
                  <p>
                    Estudantes: Carteira expedida por estabelecimento de ensino fundamental, médio, superior
                    ou pela respectiva associação e ou agremiação. Atenção: conforme disposto no § 2º do Art.
                    3° do Decreto n. 8.537/2015, deverão constar os seguintes elementos na Carteira de
                    Identificação Estudantil: I - nome completo e data de nascimento do estudante; II - foto
                    recente do estudante; III - nome da instituição de ensino na qual o estudante esteja
                    matriculado; IV - grau de escolaridade; e V - data de validade até o dia 31 de março do ano
                    subsequente ao de sua expedição. Os documentos apresentados na compra deverão ser
                    apresentados na entrada do espetáculo. Lembramos que os descontos de 50% não se
                    aplicam à cursos livres: inglês, informática ou pré-vestibular. Para sua maior segurança, os
                    ingressos não serão vendidos a outra pessoa, mesmo que esteja de posse dos seus
                    documentos.
                  </p>
                  <p>
                    Terceira idade: Pessoas com mais de 60 anos podem adquirir seus ingressos com desconto
                    de 50% de acordo com o Estatuto do Idoso (Lei nº10.741/2003, cap V, art 23). Um terceiro
                    poderá adquirir os ingressos mediante a apresentação do documento (original ou cópia) do
                    idoso.
                  </p>
                  <p>
                    Em algumas situações a meia-entrada somente será vendida na bilheteria do evento
                    mediante apresentação do documento comprobatório pelo próprio cliente. Confira as regras
                    de cada estabelecimento nos respectivos sites. Alguns eventos autorizam a venda de meia-
                    entrada através de todos os canais de venda, sendo obrigatória a apresentação do
                    documento no momento da compra e/ou no momento da entrada do evento. Neste caso, o
                    sistema  {{siteName}} estará realizando o cadastro de sua compra, na qual somente será
                    permitida a aquisição de 01 ingresso com desconto por documento para o mesmo evento. No
                    caso de não apresentação do documento comprobatório na entrada do evento, o produtor se
                    reserva o direito de solicitar o pagamento do valor de complemento do ingresso referente ao
                    preço de inteira.
                  </p>
                  <p>
                    Profissionais das escolas das redes públicas estadual e municipais de ensino do Estado de
                    SP: Diretores, coordenadores pedagógicos, supervisores e titulares de cargos do quadro de
                    apoio das escolas da redes públicas estadual e municipais de ensino do Estado de São Paulo
                    podem adquirir seus ingressos com 50% de desconto, com base na Lei 15.298/2014,
                    mediante apresentação da carteira funcional emitida pela Secretaria da Educação ou pela
                    apresentação do holerite do servidor.
                  </p>
                  <p>
                    Deficientes e acompanhantes: Deficientes farão jus ao benefício da meia entrada, e quando
                    necessário, seus acompanhantes, conforme a Lei 12.933/2013.
                  </p>
                  <p>
                    Jovens de 15 a 29 anos carentes: Jovens de 15 a 29 anos de baixa renda, inscritos no
                    Cadastro Único para Programas Sociais do Governo Federal e cuja renda familiar mensal
                    seja de até 02 salários mínimos podem adquirir os ingressos com 50% de desconto, conforme
                    Lei 12.933/2013.
                  </p>
                  <p>
                    Promoções com descontos e/ou pré-vendas exclusivas: A  {{siteName}} poderá solicitar o cadastro
                    do CPF do cliente para cada ingresso comprado bem como o código promocional quando
                    necessário, inibindo a compra novamente para o mesmo evento/apresentação, seguindo as
                    regras determinadas de cada promoção.
                  </p>
                  <p>
                    No caso de ações promocionais exclusivas para bancos, o valor ou a pré-venda poderá ser
                    restrita a seus clientes e o cadastro dos 6 primeiros dígitos do cartão de crédito autorizado
                    será obrigatório para finalização do pedido.
                  </p>
                  <p>
                    A  {{siteName}} tem uma Política Anti-Spam e segue as regras e boas práticas de marketing não
                    enviando Spam. A  {{siteName}} obedece todos os critérios do Código de Auto-regulamentação
                    para a Prática de E-mail Marketing (CAPEM – www.capem.org.br).
                    O E-mail Marketing é uma ferramenta importante para a comunicação com o cliente. Criar e
                    enviar e-mail marketing exige um criterioso sistema a ser seguido, para preservação da
                    privacidade e segurança do cliente.
                  </p>
                  <p>
                    Todo E-mail Marketing enviado pela  {{siteName}} conta com o consentimento do cliente (Opt-in),
                    pois ele mesmo opta por receber através de uma inscrição ou implicitamente quando é
                    estabelecido um contato entre as partes, sem que se utilize de meios intrusivos.
                    Todos os e-mails enviados pela  {{siteName}} possuem o link de opt-out (opção de
                    descadastramento do e-mail para receber futuras mensagens), desse modo é respeitada
                    integralmente a privacidade e liberdade de quem recebe a mensagem.

                  </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
   <div class="content" v-else-if="template == 'ingressaria'">
    <section class="to-block to-viewport bg-dark bg__main" style="">
      <div class="container justify-content-center align-items-center d-flex p-5">
        <div class="col-10 justify-content-center text-center">
          <div class="d-none d-sm-block" style="">
            <h2>Deseja encontrar outro evento ?</h2>
          </div>
          <div class="d-none d-sm-block input-group mt-4 mb-2 p-1 w-100">
            <app-search></app-search>
          </div>
        </div>
      </div>

    </section>

    <section class="to-block" style="background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFk%0D%0Ab2JlIElsbHVzdHJhdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246%0D%0AIDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzciIHhtbG5z%0D%0APSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMu%0D%0Ab3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMjE2LjkgODIy%0D%0ALjEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEyMTYuOSA4MjIuMTsiIHhtbDpz%0D%0AcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGNEY3%0D%0ARkU7fQo8L3N0eWxlPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMCwwaDEyMTYuOXY3MzguNGMwLDAt%0D%0ANTg4LjgsMjAwLTYxMi44LTE4czM4OS44LTQ3NC4yLTExMS01MjlDMTAwLjEsMTQ4LjQsMCwwLDAs%0D%0AMHoiLz4KPC9zdmc+Cg=='); padding: 120px 0 !important">
      <div class="container">
        <div class="row">
          <!-- SAC Index -->
          <sacInfo></sacInfo>

          <div class="col-12 col-lg-7 offset-lg-1 pt-4 pt-lg-0">
            <h3 class="title__page">Politica de Venda</h3>
                  <p class="lead">

                    Antes de finalizar sua compra conheça as políticas e condições de venda da  {{siteName}}:
                    Melhor lugar disponível: ao comprar pela Internet, você pode escolher o melhor lugar
                    disponível de acordo com sua preferência, simultaneamente, como se estivesse na própria
                    bilheteria do evento, isso se o evento for com lugar demaarcado.
                    A compra estará sujeita à disponibilidade de ingressos e à aprovação da operadora de seu
                    cartão de crédito.
                  </p>
                  <p class="lead">
                    Ao comprar em nosso site ou call center sua compra poderá ficar sujeita à análise e
                    aprovação do nosso Departamento de Segurança. Analisando caso a caso, documentos
                    poderão ser solicitados ao titular da compra, que deverá encaminhá-los ao e-mail indicado e
                    dentro do prazo estipulado, para finalização e entrega do pedido, sob pena de cancelamento.
                    A fim de facilitar a análise do Departamento de Segurança e garantir a autenticidade de sua
                    compra, preencha todos os campos do cadastro, em especial nome completo, número de
                    CPF, e-mail, telefone para contato e endereço.
                  </p>
                  <p class="lead">
                    Os ingressos adquiridos através dos canais de venda da  {{siteName}} poderão estar sujeitos ao
                    acréscimo da taxa de conveniência por ingresso, bem como da taxa de entrega por pedido no
                    caso de entrega em domicílio ou local de trabalho do cliente.
                    As nossas taxas de serviço são receitas exclusivas da  {{siteName}}, bem como o valor de face do
                    ingresso são receitas exclusivas do produtor do evento.
                  </p>
                  <p class="lead">
                    A Empresa comercializa seus ingressos de forma exclusiva. Para a segurança de nossos
                    Clientes, recomendamos que a compra dos ingressos seja feita somente pelos canais oficiais
                    de compra, disponíveis neste Website.
                  </p>
                  <p class="lead">
                    Não nos responsabilizamos por ingressos adquiridos em canais de venda não oficiais, seja
                    através de pessoa física, pessoa jurídica, outros Websites e comunidades na Internet, com
                    quem não possuímos qualquer vínculo.
                  </p>
                  <p class="lead">
                    Confira atentamente os dados de seu pedido (espetáculo, dia, horário, quantidades, setor)
                    antes da confirmação de sua compra. Não serão permitidos cancelamento, troca ou
                    devolução de ingressos. O seu ingresso é um produto único, ou seja, após sua compra ele
                    não estará mais disponível para venda.
                  </p>
                  <p class="lead">
                    Em caso de arrependimento do cliente, o reembolso do valor do ingresso será efetuado,
                    descontando as taxas de serviço (conveniência) e entrega (se houver), desde que esse direito
                    seja requisitado em até 7 (sete) dias da data da compra, e que seja em até 48 (quarenta e
                    oito) horas antes da data do espetáculo ou evento, sendo assim, para compras realizadas
                    próximo da data do evento, os ingressos só poderão ser cancelados em até 48 (quarenta e
                    oito) horas antes da data do evento.
                  </p>
                  <p class="lead">
                    Para ingressos adquiridos em ponto de venda e bilheteria, o estorno do valor pago somente
                    será efetuado após a apresentação física dos mesmos nos pontos de venda da  {{siteName}}. Este
                    procedimento não é necessário para e-ticket, mobile ticket e quando se tratar de evento
                    cancelado. Depois de confirmada a autenticidade do ingresso, a devolução dos valores pagos
                    seguirá o procedimento abaixo descrito, de acordo com a forma de pagamento utilizada:
                    Cartão de crédito: o estorno do valor será solicitado à operadora do cartão, que disponibilizará
                    o crédito em fatura seguinte ou subsequente.
                  </p>
                  <p class="lead">
                    Cartão de débito: o estorno do valor será solicitado à operadora do cartão utilizado na
                    compra, que creditará o valor em conta bancária vinculada ao cartão, em até 15 dias úteis.
                    Dinheiro: depósito bancário em até 20 dias úteis.
                  </p>
                  <p class="lead">
                    Informamos que os prazos discriminados nos itens 4.2.1 e 4.2.2, para estornos via cartão,
                    crédito ou débito, podem variar, de acordo com o fechamento de sua fatura e/ou seu banco
                    emissor.
                  </p>
                  <p class="lead">
                    Caso o consumidor ainda não tenha recebido seu ingresso, o cliente poderá exercer o direito
                    de arrependimento através da central de atendimento da  {{siteName}}, observadas as condições
                    aqui estipuladas.
                  </p>
                  <p class="lead">
                    Em casos de cancelamento do evento por parte da produção, os valores relativos às entregas
                    já efetuadas não serão devolvidos. 5. Para sua segurança, todas as compras, via telefone ou
                    internet, somente poderão ser entregues ao proprietário do cartão de crédito utilizado na
                    compra (o nome do titular do cartão deve ser o mesmo nome de cadastro do pedido na
                    internet), mediante a apresentação dos seguintes documentos: Cartão de Crédito original,
                    Documento de Identidade e senha personalizada de sua compra recebida após a confirmação
                    de seu pedido.
                  </p>
                  <p class="lead">
                    Nas hipóteses de venda de ingressos via telefone ou internet, o cliente poderá retirar os
                    ingressos adquiridos nos pontos de venda da  {{siteName}} somente após 48 horas da
                    data da compra e/ou liberação do pedido, ou no local do espetáculo ou evento em até 2
                    (duas) horas antes do seu início, sem a cobrança da taxa de entrega.
                    Para retirada dos ingressos em um de nossos pontos de venda, poderá ser requisitada a
                    apresentação também de cópia da fatura de seu cartão de crédito utilizado na compra
                    contendo nome do titular, número do cartão e endereço conforme cadastro. 5.3. O cliente
                    autoriza desde já o decalque do número do cartão de crédito no protocolo de entrega que
                    deverá ser assinado pelo cliente.
                  </p>
                  <p class="lead">
                    Para a prestação do serviço de entrega, se contratado no ato da compra, serão realizadas 02
                    (duas) tentativas em horário comercial (segunda à sexta-feira, das 8.00h às 18.00h). Em caso
                    de ausência do destinatário e/ou recebedor autorizado, os ingressos retornarão à Ingresso
                    Rápido e as tentativas poderão ser consultadas. Caso não seja possível a entrega nas 02
                    (duas) tentativas previstas, poderá ser solicitado uma terceira tentativa de entrega, mediante
                    o pagamento de nova taxa de envio, ou, se preferir, os ingressos ficarão disponíveis para
                    retirada na bilheteria, no dia e no local do evento, a partir de 2h antes do início do espetáculo.
                  </p>
                  <p class="lead">
                    A  {{siteName}} não se responsabiliza por endereços incompletos e/ou errados. Se ocorrer, os
                    ingressos retornarão à origem e se o cliente ainda desejar o serviço, será cobrado nova taxa
                    de envio ou, se preferir, os ingressos ficarão disponíveis para retirada na bilheteria, no dia e
                    no local do evento, a partir de 2h antes do início do espetáculo. Confira atentamente seu
                    cadastro.
                  </p>
                  <p class="lead">
                    Se o ingresso não for recebido em endereço solicitado em até 48hs antes do evento, contate
                    a  {{siteName}} através de seus canais de atendimento, informados neste site.
                    Após a retirada ou recebimento dos ingressos, os mesmos são de responsabilidade do
                    Cliente. Caso sejam perdidos, roubados ou danificados, não será possível solicitar sua
                    reimpressão.
                  </p>
                  <p class="lead">
                    Meia-Entrada: a compra de meia-entrada e/ou outros descontos estará sujeita a regras do
                    produtor de cada evento ou casa de espetáculo.
                  </p>
                  <p class="lead">
                    Estudantes: Carteira expedida por estabelecimento de ensino fundamental, médio, superior
                    ou pela respectiva associação e ou agremiação. Atenção: conforme disposto no § 2º do Art.
                    3° do Decreto n. 8.537/2015, deverão constar os seguintes elementos na Carteira de
                    Identificação Estudantil: I - nome completo e data de nascimento do estudante; II - foto
                    recente do estudante; III - nome da instituição de ensino na qual o estudante esteja
                    matriculado; IV - grau de escolaridade; e V - data de validade até o dia 31 de março do ano
                    subsequente ao de sua expedição. Os documentos apresentados na compra deverão ser
                    apresentados na entrada do espetáculo. Lembramos que os descontos de 50% não se
                    aplicam à cursos livres: inglês, informática ou pré-vestibular. Para sua maior segurança, os
                    ingressos não serão vendidos a outra pessoa, mesmo que esteja de posse dos seus
                    documentos.
                  </p>
                  <p class="lead">
                    Terceira idade: Pessoas com mais de 60 anos podem adquirir seus ingressos com desconto
                    de 50% de acordo com o Estatuto do Idoso (Lei nº10.741/2003, cap V, art 23). Um terceiro
                    poderá adquirir os ingressos mediante a apresentação do documento (original ou cópia) do
                    idoso.
                  </p>
                  <p class="lead">
                    Em algumas situações a meia-entrada somente será vendida na bilheteria do evento
                    mediante apresentação do documento comprobatório pelo próprio cliente. Confira as regras
                    de cada estabelecimento nos respectivos sites. Alguns eventos autorizam a venda de meia-
                    entrada através de todos os canais de venda, sendo obrigatória a apresentação do
                    documento no momento da compra e/ou no momento da entrada do evento. Neste caso, o
                    sistema  {{siteName}} estará realizando o cadastro de sua compra, na qual somente será
                    permitida a aquisição de 01 ingresso com desconto por documento para o mesmo evento. No
                    caso de não apresentação do documento comprobatório na entrada do evento, o produtor se
                    reserva o direito de solicitar o pagamento do valor de complemento do ingresso referente ao
                    preço de inteira.
                  </p>
                  <p class="lead">
                    Profissionais das escolas das redes públicas estadual e municipais de ensino do Estado de
                    SP: Diretores, coordenadores pedagógicos, supervisores e titulares de cargos do quadro de
                    apoio das escolas da redes públicas estadual e municipais de ensino do Estado de São Paulo
                    podem adquirir seus ingressos com 50% de desconto, com base na Lei 15.298/2014,
                    mediante apresentação da carteira funcional emitida pela Secretaria da Educação ou pela
                    apresentação do holerite do servidor.
                  </p>
                  <p class="lead">
                    Deficientes e acompanhantes: Deficientes farão jus ao benefício da meia entrada, e quando
                    necessário, seus acompanhantes, conforme a Lei 12.933/2013.
                  </p>
                  <p class="lead">
                    Jovens de 15 a 29 anos carentes: Jovens de 15 a 29 anos de baixa renda, inscritos no
                    Cadastro Único para Programas Sociais do Governo Federal e cuja renda familiar mensal
                    seja de até 02 salários mínimos podem adquirir os ingressos com 50% de desconto, conforme
                    Lei 12.933/2013.
                  </p>
                  <p class="lead">
                    Promoções com descontos e/ou pré-vendas exclusivas: A  {{siteName}} poderá solicitar o cadastro
                    do CPF do cliente para cada ingresso comprado bem como o código promocional quando
                    necessário, inibindo a compra novamente para o mesmo evento/apresentação, seguindo as
                    regras determinadas de cada promoção.
                  </p>
                  <p class="lead">
                    No caso de ações promocionais exclusivas para bancos, o valor ou a pré-venda poderá ser
                    restrita a seus clientes e o cadastro dos 6 primeiros dígitos do cartão de crédito autorizado
                    será obrigatório para finalização do pedido.
                  </p>
                  <p class="lead">
                    A  {{siteName}} tem uma Política Anti-Spam e segue as regras e boas práticas de marketing não
                    enviando Spam. A  {{siteName}} obedece todos os critérios do Código de Auto-regulamentação
                    para a Prática de E-mail Marketing (CAPEM – www.capem.org.br).
                    O E-mail Marketing é uma ferramenta importante para a comunicação com o cliente. Criar e
                    enviar e-mail marketing exige um criterioso sistema a ser seguido, para preservação da
                    privacidade e segurança do cliente.
                  </p>
                  <p class="lead">
                    Todo E-mail Marketing enviado pela  {{siteName}} conta com o consentimento do cliente (Opt-in),
                    pois ele mesmo opta por receber através de uma inscrição ou implicitamente quando é
                    estabelecido um contato entre as partes, sem que se utilize de meios intrusivos.
                    Todos os e-mails enviados pela  {{siteName}} possuem o link de opt-out (opção de
                    descadastramento do e-mail para receber futuras mensagens), desse modo é respeitada
                    integralmente a privacidade e liberdade de quem recebe a mensagem.

                  </p>
          </div>
        </div>
      </div>
    </section>

  </div>
  <div class="content" v-else>
      <section class="to-block to-viewport bg-dark bg__main" style="" data-block-type="call_to_action" data-id="2" v-if="template == 'ticketHub'">
    <div class="container justify-content-center align-items-center d-flex p-5">
      <div class="col-10 justify-content-center text-center">
        <div class="d-none d-sm-block" style="">
          <h2>Deseja encontrar outro evento ?</h2>
        </div>
        <div class="d-none d-sm-block input-group mt-4 mb-2 p-1 w-100">
          <app-search></app-search>
        </div>
      </div>
    </div>

  </section>
    <div class="container container__sac">
      <div class="">
        
        <div class="row">
          <!-- SAC Index -->
          <sacInfo></sacInfo>

          <!-- Show SAC content -->
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-12">

                <div class="content__description">
                  <div class="card event__card sac__card">
                  <h3 class="title__page">Politica de Venda</h3>
                  <p>

                    Antes de finalizar sua compra conheça as políticas e condições de venda da  {{siteName}}:
                    Melhor lugar disponível: ao comprar pela Internet, você pode escolher o melhor lugar
                    disponível de acordo com sua preferência, simultaneamente, como se estivesse na própria
                    bilheteria do evento, isso se o evento for com lugar demaarcado.
                    A compra estará sujeita à disponibilidade de ingressos e à aprovação da operadora de seu
                    cartão de crédito.
                  </p>
                  <p>
                    Ao comprar em nosso site ou call center sua compra poderá ficar sujeita à análise e
                    aprovação do nosso Departamento de Segurança. Analisando caso a caso, documentos
                    poderão ser solicitados ao titular da compra, que deverá encaminhá-los ao e-mail indicado e
                    dentro do prazo estipulado, para finalização e entrega do pedido, sob pena de cancelamento.
                    A fim de facilitar a análise do Departamento de Segurança e garantir a autenticidade de sua
                    compra, preencha todos os campos do cadastro, em especial nome completo, número de
                    CPF, e-mail, telefone para contato e endereço.
                  </p>
                  <p>
                    Os ingressos adquiridos através dos canais de venda da  {{siteName}} poderão estar sujeitos ao
                    acréscimo da taxa de conveniência por ingresso, bem como da taxa de entrega por pedido no
                    caso de entrega em domicílio ou local de trabalho do cliente.
                    As nossas taxas de serviço são receitas exclusivas da  {{siteName}}, bem como o valor de face do
                    ingresso são receitas exclusivas do produtor do evento.
                  </p>
                  <p>
                    A Empresa comercializa seus ingressos de forma exclusiva. Para a segurança de nossos
                    Clientes, recomendamos que a compra dos ingressos seja feita somente pelos canais oficiais
                    de compra, disponíveis neste Website.
                  </p>
                  <p>
                    Não nos responsabilizamos por ingressos adquiridos em canais de venda não oficiais, seja
                    através de pessoa física, pessoa jurídica, outros Websites e comunidades na Internet, com
                    quem não possuímos qualquer vínculo.
                  </p>
                  <p>
                    Confira atentamente os dados de seu pedido (espetáculo, dia, horário, quantidades, setor)
                    antes da confirmação de sua compra. Não serão permitidos cancelamento, troca ou
                    devolução de ingressos. O seu ingresso é um produto único, ou seja, após sua compra ele
                    não estará mais disponível para venda.
                  </p>
                  <p>
                    Em caso de arrependimento do cliente, o reembolso do valor do ingresso será efetuado,
                    descontando as taxas de serviço (conveniência) e entrega (se houver), desde que esse direito
                    seja requisitado em até 7 (sete) dias da data da compra, e que seja em até 48 (quarenta e
                    oito) horas antes da data do espetáculo ou evento, sendo assim, para compras realizadas
                    próximo da data do evento, os ingressos só poderão ser cancelados em até 48 (quarenta e
                    oito) horas antes da data do evento.
                  </p>
                  <p>
                    Para ingressos adquiridos em ponto de venda e bilheteria, o estorno do valor pago somente
                    será efetuado após a apresentação física dos mesmos nos pontos de venda da  {{siteName}}. Este
                    procedimento não é necessário para e-ticket, mobile ticket e quando se tratar de evento
                    cancelado. Depois de confirmada a autenticidade do ingresso, a devolução dos valores pagos
                    seguirá o procedimento abaixo descrito, de acordo com a forma de pagamento utilizada:
                    Cartão de crédito: o estorno do valor será solicitado à operadora do cartão, que disponibilizará
                    o crédito em fatura seguinte ou subsequente.
                  </p>
                  <p>
                    Cartão de débito: o estorno do valor será solicitado à operadora do cartão utilizado na
                    compra, que creditará o valor em conta bancária vinculada ao cartão, em até 15 dias úteis.
                    Dinheiro: depósito bancário em até 20 dias úteis.
                  </p>
                  <p>
                    Informamos que os prazos discriminados nos itens 4.2.1 e 4.2.2, para estornos via cartão,
                    crédito ou débito, podem variar, de acordo com o fechamento de sua fatura e/ou seu banco
                    emissor.
                  </p>
                  <p>
                    Caso o consumidor ainda não tenha recebido seu ingresso, o cliente poderá exercer o direito
                    de arrependimento através da central de atendimento da  {{siteName}}, observadas as condições
                    aqui estipuladas.
                  </p>
                  <p>
                    Em casos de cancelamento do evento por parte da produção, os valores relativos às entregas
                    já efetuadas não serão devolvidos. 5. Para sua segurança, todas as compras, via telefone ou
                    internet, somente poderão ser entregues ao proprietário do cartão de crédito utilizado na
                    compra (o nome do titular do cartão deve ser o mesmo nome de cadastro do pedido na
                    internet), mediante a apresentação dos seguintes documentos: Cartão de Crédito original,
                    Documento de Identidade e senha personalizada de sua compra recebida após a confirmação
                    de seu pedido.
                  </p>
                  <p>
                    Nas hipóteses de venda de ingressos via telefone ou internet, o cliente poderá retirar os
                    ingressos adquiridos nos pontos de venda da  {{siteName}} somente após 48 horas da
                    data da compra e/ou liberação do pedido, ou no local do espetáculo ou evento em até 2
                    (duas) horas antes do seu início, sem a cobrança da taxa de entrega.
                    Para retirada dos ingressos em um de nossos pontos de venda, poderá ser requisitada a
                    apresentação também de cópia da fatura de seu cartão de crédito utilizado na compra
                    contendo nome do titular, número do cartão e endereço conforme cadastro. 5.3. O cliente
                    autoriza desde já o decalque do número do cartão de crédito no protocolo de entrega que
                    deverá ser assinado pelo cliente.
                  </p>
                  <p>
                    Para a prestação do serviço de entrega, se contratado no ato da compra, serão realizadas 02
                    (duas) tentativas em horário comercial (segunda à sexta-feira, das 8.00h às 18.00h). Em caso
                    de ausência do destinatário e/ou recebedor autorizado, os ingressos retornarão à Ingresso
                    Rápido e as tentativas poderão ser consultadas. Caso não seja possível a entrega nas 02
                    (duas) tentativas previstas, poderá ser solicitado uma terceira tentativa de entrega, mediante
                    o pagamento de nova taxa de envio, ou, se preferir, os ingressos ficarão disponíveis para
                    retirada na bilheteria, no dia e no local do evento, a partir de 2h antes do início do espetáculo.
                  </p>
                  <p>
                    A  {{siteName}} não se responsabiliza por endereços incompletos e/ou errados. Se ocorrer, os
                    ingressos retornarão à origem e se o cliente ainda desejar o serviço, será cobrado nova taxa
                    de envio ou, se preferir, os ingressos ficarão disponíveis para retirada na bilheteria, no dia e
                    no local do evento, a partir de 2h antes do início do espetáculo. Confira atentamente seu
                    cadastro.
                  </p>
                  <p>
                    Se o ingresso não for recebido em endereço solicitado em até 48hs antes do evento, contate
                    a  {{siteName}} através de seus canais de atendimento, informados neste site.
                    Após a retirada ou recebimento dos ingressos, os mesmos são de responsabilidade do
                    Cliente. Caso sejam perdidos, roubados ou danificados, não será possível solicitar sua
                    reimpressão.
                  </p>
                  <p>
                    Meia-Entrada: a compra de meia-entrada e/ou outros descontos estará sujeita a regras do
                    produtor de cada evento ou casa de espetáculo.
                  </p>
                  <p>
                    Estudantes: Carteira expedida por estabelecimento de ensino fundamental, médio, superior
                    ou pela respectiva associação e ou agremiação. Atenção: conforme disposto no § 2º do Art.
                    3° do Decreto n. 8.537/2015, deverão constar os seguintes elementos na Carteira de
                    Identificação Estudantil: I - nome completo e data de nascimento do estudante; II - foto
                    recente do estudante; III - nome da instituição de ensino na qual o estudante esteja
                    matriculado; IV - grau de escolaridade; e V - data de validade até o dia 31 de março do ano
                    subsequente ao de sua expedição. Os documentos apresentados na compra deverão ser
                    apresentados na entrada do espetáculo. Lembramos que os descontos de 50% não se
                    aplicam à cursos livres: inglês, informática ou pré-vestibular. Para sua maior segurança, os
                    ingressos não serão vendidos a outra pessoa, mesmo que esteja de posse dos seus
                    documentos.
                  </p>
                  <p>
                    Terceira idade: Pessoas com mais de 60 anos podem adquirir seus ingressos com desconto
                    de 50% de acordo com o Estatuto do Idoso (Lei nº10.741/2003, cap V, art 23). Um terceiro
                    poderá adquirir os ingressos mediante a apresentação do documento (original ou cópia) do
                    idoso.
                  </p>
                  <p>
                    Em algumas situações a meia-entrada somente será vendida na bilheteria do evento
                    mediante apresentação do documento comprobatório pelo próprio cliente. Confira as regras
                    de cada estabelecimento nos respectivos sites. Alguns eventos autorizam a venda de meia-
                    entrada através de todos os canais de venda, sendo obrigatória a apresentação do
                    documento no momento da compra e/ou no momento da entrada do evento. Neste caso, o
                    sistema  {{siteName}} estará realizando o cadastro de sua compra, na qual somente será
                    permitida a aquisição de 01 ingresso com desconto por documento para o mesmo evento. No
                    caso de não apresentação do documento comprobatório na entrada do evento, o produtor se
                    reserva o direito de solicitar o pagamento do valor de complemento do ingresso referente ao
                    preço de inteira.
                  </p>
                  <p>
                    Profissionais das escolas das redes públicas estadual e municipais de ensino do Estado de
                    SP: Diretores, coordenadores pedagógicos, supervisores e titulares de cargos do quadro de
                    apoio das escolas da redes públicas estadual e municipais de ensino do Estado de São Paulo
                    podem adquirir seus ingressos com 50% de desconto, com base na Lei 15.298/2014,
                    mediante apresentação da carteira funcional emitida pela Secretaria da Educação ou pela
                    apresentação do holerite do servidor.
                  </p>
                  <p>
                    Deficientes e acompanhantes: Deficientes farão jus ao benefício da meia entrada, e quando
                    necessário, seus acompanhantes, conforme a Lei 12.933/2013.
                  </p>
                  <p>
                    Jovens de 15 a 29 anos carentes: Jovens de 15 a 29 anos de baixa renda, inscritos no
                    Cadastro Único para Programas Sociais do Governo Federal e cuja renda familiar mensal
                    seja de até 02 salários mínimos podem adquirir os ingressos com 50% de desconto, conforme
                    Lei 12.933/2013.
                  </p>
                  <p>
                    Promoções com descontos e/ou pré-vendas exclusivas: A  {{siteName}} poderá solicitar o cadastro
                    do CPF do cliente para cada ingresso comprado bem como o código promocional quando
                    necessário, inibindo a compra novamente para o mesmo evento/apresentação, seguindo as
                    regras determinadas de cada promoção.
                  </p>
                  <p>
                    No caso de ações promocionais exclusivas para bancos, o valor ou a pré-venda poderá ser
                    restrita a seus clientes e o cadastro dos 6 primeiros dígitos do cartão de crédito autorizado
                    será obrigatório para finalização do pedido.
                  </p>
                  <p>
                    A  {{siteName}} tem uma Política Anti-Spam e segue as regras e boas práticas de marketing não
                    enviando Spam. A  {{siteName}} obedece todos os critérios do Código de Auto-regulamentação
                    para a Prática de E-mail Marketing (CAPEM – www.capem.org.br).
                    O E-mail Marketing é uma ferramenta importante para a comunicação com o cliente. Criar e
                    enviar e-mail marketing exige um criterioso sistema a ser seguido, para preservação da
                    privacidade e segurança do cliente.
                  </p>
                  <p>
                    Todo E-mail Marketing enviado pela  {{siteName}} conta com o consentimento do cliente (Opt-in),
                    pois ele mesmo opta por receber através de uma inscrição ou implicitamente quando é
                    estabelecido um contato entre as partes, sem que se utilize de meios intrusivos.
                    Todos os e-mails enviados pela  {{siteName}} possuem o link de opt-out (opção de
                    descadastramento do e-mail para receber futuras mensagens), desse modo é respeitada
                    integralmente a privacidade e liberdade de quem recebe a mensagem.

                  </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import VueHead from 'vue-head';
import VueResource from "vue-resource";
import Logo from "@/components/App-logo.vue";
import SacInfo from "@/views/sac/sac-info.vue";
import AppSearch from "@/components/App-search.vue";
import config from "@/config";
import {
  func
} from "@/functions";
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.use(VueHead);
Vue.use(VueResource);

export default {
  name: "sales",
  mixins: [func],
  components: {
    Logo,
    SacInfo,
    AppSearch
  },
  head: {
    title: function () {
      return {
        inner: ``,
        separator: "",
        complement: config.info.title,
      }
    },
    meta: function () {
      return [{
          name: 'application-name',
          id: 'application-name',
          content: this.metaObj.appName
        },
        {
          name: 'description',
          id: 'description',
          content: this.metaObj.description
        },
        {
          name: 'keywords',
          id: 'keywords',
          content: this.metaObj.keywords
        },
        {
          itemprop: 'name',
          id: 'name',
          content: this.metaObj.name
        },
        {
          itemprop: 'description',
          id: 'itempropdescription',
          content: this.metaObj.description
        },
        {
          name: 'twitter:card',
          id: 'twitter_card',
          content: this.metaObj.twitter.card
        },
        {
          name: 'twitter:title',
          id: 'twitter_title',
          content: this.metaObj.twitter.title
        },
        {
          name: 'twitter:description',
          id: 'twitter_description',
          content: this.metaObj.twitter.description
        },
        {
          name: 'twitter:image',
          id: 'twitter_image',
          content: this.metaObj.twitter.image.root
        },
        {
          name: 'twitter:image:alt',
          id: 'twitter_imagealt',
          content: this.metaObj.twitter.image.alt
        },
        {
          property: 'og:title',
          id: 'og_title',
          content: this.metaObj.og.title
        },
        {
          property: 'og:type',
          id: 'og_type',
          content: this.metaObj.og.type
        },
        {
          property: 'og:url',
          id: 'og_url',
          content: this.metaObj.og.url
        },
        {
          property: 'og:description',
          id: 'og_description',
          content: this.metaObj.og.description
        },
        {
          property: 'og:site_name',
          id: 'og_site_name',
          content: this.metaObj.og.site_name
        },
        {
          property: 'og:image',
          id: 'og_image',
          content: this.metaObj.og.image.root
        },
        {
          property: 'og:image:secure_url',
          id: 'og_image_secure_url',
          content: this.metaObj.og.image.secure_url
        },
        {
          property: 'og:image:type',
          id: 'og_image_type',
          content: this.metaObj.og.image.type
        },
        {
          property: 'og:image:alt',
          id: 'og_image_alt',
          content: this.metaObj.og.image.alt
        },
      ]
    },
  },
  data() {
    return {
      newTemplate: true,
      metaObj: this.metatag_getObj(),
      siteName: config.info.siteName,
    };
  },
  mounted() {
    this.createMetaObj();
  },
  methods: {
    createMetaObj() {
      this.metaObj.appName = config.info.siteName;
      this.metaObj.description = config.info.meta_description;
      this.metaObj.keywords = config.info.meta_keywords;
      this.metaObj.name = config.info.siteName;
      this.metaObj.twitter.card = 'summary_large_image';
      this.metaObj.twitter.title = config.info.siteName;
      this.metaObj.twitter.description = config.info.meta_description;
      this.metaObj.twitter.image.root = config.info.logo;
      this.metaObj.twitter.image.alt = config.info.siteName;
      this.metaObj.og.title = config.info.siteName;
      this.metaObj.og.type = 'website';
      this.metaObj.og.url = config.host;
      this.metaObj.og.description = config.info.meta_description;
      this.metaObj.og.site_name = config.info.siteName;
      this.metaObj.og.image.root = config.info.logo;
      this.metaObj.og.image.secure_url = config.info.logo;
      this.metaObj.og.image.type = 'image/jpeg';
      this.metaObj.og.image.alt = config.info.siteName;
      this.$emit('updateHead');

    },

  },
  created() {}
};
</script>

<style lang="scss">
  .container__sac {
    margin-top: -150px;
    margin-bottom: 100px;
  }
</style>
