export const APP_TITLE: string = 'Rio Bus';

// Sidemenu
export const MENU_TITLE: string = APP_TITLE;
export const MENU_OPTION_FAVORITES: string = 'Favoritos';
export const MENU_OPTION_HISTORY: string = 'Histórico';
export const MENU_OPTION_FEEDBACK: string = 'Enviar comentários';
export const MENU_OPTION_ABOUT: string = 'Sobre';
export const MENU_OPTION_SETTINGS: string = 'Configurações';
export const MENU_OPTION_RATE: string = 'Avalie o app';
export const MENU_OPTION_LIKE: string = 'Curta no Facebook';

// MapSnackbar component
export const COMPONENT_SNACKBAR_COMING: string = 'SENTIDO';
export const COMPONENT_SNACKBAR_GOING: string = 'DESCONHECIDO';

// ClearHistory component
export const COMPONENT_CLEAR_HISTORY_ALERT_TITLE: string = 'Limpar Histórico';
export const COMPONENT_CLEAR_HISTORY_ALERT_MESSAGE: string = 'Esta ação não poderá ser desfeita.';
export const COMPONENT_CLEAR_HISTORY_ALERT_BUTTON_YES: string = 'Sim';
export const COMPONENT_CLEAR_HISTORY_ALERT_BUTTON_NO: string = 'Não';

// MapPage
export const PAGE_MAP_ERROR_NO_BUSES: string = 'Nenhum ônibus foi encontrado.';
export const PAGE_MAP_ERROR_UNKNOWN: string = 'Ocorreu um erro na busca. Por favor, entre em contato com o suporte.';

// Favorites Page
export const PAGE_FAVORITES_TITLE: string = 'Favoritos';

// Settings Page
export const PAGE_SETTINGS_TITLE: string = 'Configurações';
export const PAGE_SETTINGS_TRAJECTORY: string = 'Ocultar trajetórias';
export const PAGE_SETTINGS_BUSES: string = 'Ocultar ônibus desatualizados';
export const PAGE_SETTINGS_HISTORY: string = 'Limpar Histórico';
export const PAGE_SETTINGS_VERSION: string = 'Versão';
export const PAGE_SETTINGS_HEADER_GENERAL: string = 'Geral';
export const PAGE_SETTINGS_HEADER_INFO: string = 'Informações';

// History Page
export const PAGE_HISTORY_TITLE: string = 'Histórico';

// Search Page
export const PAGE_SEARCH_INPUT: string = 'Buscar...';
export const PAGE_SEARCH_RECENTS: string = 'Pesquisas recentes';
export const PAGE_SEARCH_AVAILABLE: string = 'Linhas disponíveis';
export const PAGE_SEARCH_SEARCHFOR: string = 'Linha não encontrada. Clique para pesquisar...';

// About Page
export const PAGE_ABOUT_TITLE: string = 'Sobre o Rio Bus';
export const PAGE_ABOUT_CONTENT: string = `
  <p>O RioBus é um sistema colaborativo de monitoramento de ônibus em tempo real, que utiliza a API de dados abertos de mobilidade urbana fornecida pela parceiria entre a Prefeitura do Rio de Janeiro e a FETRANSPOR. Seu objetivo principal é ajudar o cidadão do Rio de Janeiro, seja ele morador ou visitante, a se deslocar pela cidade.</p>
  
  <p>O serviço é desenvolvido de forma colaborativa, e por isso depende da sua ajuda para melhorar, seja dando apenas um feedback ou aprimorando o código.</p>
  
  <h3>Como funciona?</h3>
  
  <p>Basta digitar a linha do ônibus que você deseja encontrar na caixa de busca e a posição de cada carro aparecerá no mapa. Além disso, você pode ver mais informações sobre o ônibus ao clicar sobre o marcador.</p>
  
  <h3>Legenda dos marcadores</h3>
  
  <p>
    <b>Verde:</b> atualizado há menos de 5 min <br>
    <b>Amarelo:</b> atualizado entre 5 e 10 min atrás <br>
    <b>Vermelho:</b> atualizado há mais de 10 min
  </p>
  
  <h3>Gostou do projeto?</h3>
  
  <p>Você pode colaborar com o projeto sempre nos enviando suas críticas e sugestões através da nossa página no <a href="fb://page/1408367169433222" target="_blank">Facebook</a>. Ou então, caso você seja o tipo que prefere pôr a mão na massa, pode nos ajudar a aprimorar o nosso código, que está hospedado publicamente no <a href="https://github.com/riobus" target="_blank">Github</a>. O código está licensiado sob a licença GNU GPL v2, isso quer dizer que você pode alterar e reutilizar à vontade!</p>
`;
