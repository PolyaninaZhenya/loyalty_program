import WPAPI from 'wpapi';

const backend = new WPAPI({
    endpoint: 'http://fine02r4.beget.tech/wp-json'
});

backend.programs = backend.registerRoute( 'wp/v2', '/programs/(?P<id>)' );
backend.catPrograms = backend.registerRoute( 'wp/v2', '/cat_programs/(?P<id>)', {
    params: [ 'post', 'term' ]
} );

export default backend;