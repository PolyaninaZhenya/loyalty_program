import WPAPI from 'wpapi';

const backend = new WPAPI({
    endpoint: 'http://admin.ommo.loc/wp-json'
});

backend.programs = backend.registerRoute( 'wp/v2', '/program/(?P<id>)' );
backend.card = backend.registerRoute( 'wp/v2', '/card/(?P<id>)' );
backend.getVendor = backend.registerRoute( 'ommo/v2', '/get_vendor_by_id/(?P<id>)');

backend.addUserForCard = backend.registerRoute( 'ommo/v2', '/add_user_for_card/(?P<id>)', {
    params: [ 'postId', 'userId']
} );

export default backend;