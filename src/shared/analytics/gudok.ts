/**
 * Проект коллтрекинга Gudok. Как и номер счётчика Метрики, не секрет: виден в коде
 * каждой страницы, поэтому хранится здесь, а не в секрете боевой сборки.
 */
const GUDOK_PROJECT_ID = 'fzbaipz2lb'

/**
 * Коллтрекинг подменяет номера телефонов на странице, поэтому включён только в сборке
 * для боевого сервера — при разработке звонки и визиты не должны попадать в статистику.
 */
export const gudokProjectId = import.meta.env.PROD ? GUDOK_PROJECT_ID : ''

/** Код вставки из кабинета Gudok, без изменений кроме номера проекта. */
export const gudokTag = gudokProjectId
  ? `<script type="text/javascript">(function(window,document,n,project_ids){window.GudokData=n;if(typeof project_ids !== "object"){project_ids = [project_ids]};window[n] = {};window[n]["projects"]=project_ids;config_load(project_ids.join(','));function config_load(cId){var a=document.getElementsByTagName("script")[0],s=document.createElement("script"),i=function(){a.parentNode.insertBefore(s,a)},cMrs='';s.async=true;if(document.location.search&&document.location.search.indexOf('?gudok_check=')===0)cMrs+=document.location.search.replace('?','&');s.src="//mod.gudok.tel/script.js?sid="+cId+cMrs;if(window.opera == "[object Opera]"){document.addEventListener("DOMContentLoaded", i, false)}else{i()}}})(window, document, "gd", "${gudokProjectId}");</script>`
  : ''
