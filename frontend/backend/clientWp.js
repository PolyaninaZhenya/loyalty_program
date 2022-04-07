import WPAPI from 'wpapi';

const backend = new WPAPI({
    endpoint: 'http://admin.ommo.loc/wp-json'
});

backend.programs = backend.registerRoute( 'wp/v2', '/program/(?P<id>)' );
backend.card = backend.registerRoute( 'wp/v2', '/card/(?P<id>)' );


export default backend;