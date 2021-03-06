'use strict';

describe('User Session Controller', function () {
    beforeEach(module('smlBootstrap.services', 'smlBootstrap.controllers'));

    describe('without logged user', function () {
        var scope, ctrl, userSessionService;

        beforeEach(inject(function ($rootScope, $controller, UserSessionService) {
            scope = $rootScope.$new();
            ctrl = $controller('UserSessionController', {$scope: scope});
            userSessionService = UserSessionService;
        }));

        it('Should have user not logged', function () {
            expect(scope.isLogged()).toBe(false);
        });
    });

    describe('with user logged in', function () {
        var scope, ctrl, userSessionService, $httpBackend;

        beforeEach(inject(function ($rootScope, $controller, $cookies, _$httpBackend_, $location, UserSessionService) {
            scope = $rootScope.$new();
            ctrl = $controller('UserSessionController', {$scope: scope});
            userSessionService = UserSessionService;
            userSessionService.loggedUser = {
                login: "User1"
            };
            $cookies["scentry.auth.default.user"] = "Jan Kowalski";
            $httpBackend = _$httpBackend_;
        }));

        it("should know user is logged in", function() {
            expect(scope.isLogged()).toBe(true);
        });

        it("user should be able to log out", function () {
            // Given
            $httpBackend.expectGET('rest/users/logout').respond('anything');
            expect(userSessionService.loggedUser).not.toBe(null);

            // When
            scope.logout();
            $httpBackend.flush();

            // Then
            expect(scope.isLogged()).toBe(false);
        });
    });
});