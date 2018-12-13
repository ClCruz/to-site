import multi from "../multi";

const mytext = {
  title: multi.info.title,
  description: multi.info.description, //Page description. No longer than 155 characters.
  siteName: multi.info.siteName,
  CNPJ: multi.info.CNPJ,
  companyName: multi.info.companyName,
  companyAddress: multi.info.companyAddress,
  logo: multi.logo,
  meta_description: multi.meta.description,
  meta_keywords: multi.meta.keywords,
  favicoPath: multi.favico,
  newTemplate: multi.newTemplate,
}

export default Object.assign({}, mytext);