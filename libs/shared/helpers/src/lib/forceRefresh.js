import Router from 'next/router';

const forceRefresh = () => Router.reload(window.location.pathname);

export default forceRefresh;
