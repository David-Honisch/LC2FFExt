describe('ReceiveMessage', function() {
    describe('ping', function() {
        it('should return pong in response', function(done) {
            ReceiveMessage.ping(false, false, function(response) {
                expect(response).to.equal('pong');
                done();
            });
        });
    });
});