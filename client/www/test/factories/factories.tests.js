describe('Factories', function () {
    var queryParser;

    beforeEach(module('accountSetting'));

    beforeEach(inject(function (_queryParser_) {
        queryParser = _queryParser_;
    }));

    it('can parse values by key from query string', function () {
        expect(queryParser.get('?nickName=叽歪', 'nickName')).toBe('叽歪');

        spyOn(queryParser, 'getQueryString').and.returnValue('?nickName=叽歪');
        expect(queryParser.getQueryString()).toBe('?nickName=叽歪');
        expect(queryParser.get('nickName')).toBe('叽歪');
    });
});