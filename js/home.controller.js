(function () {
  'use strict';
  //debugger;
  angular.module('form').controller('homeCtrl', homeCtrl);
  homeCtrl.$inject = ['$timeout', '$rootScope', 'CommonService'];
    function homeCtrl($timeout, $rootScope, CommonService) {
        var vm = this;
		vm.sendEmail = function (isValid) {
            if (!isValid) {
                $rootScope.$broadcast('alert-event', { type: 'danger', msg: "Existen errores en el formulario!" });
                return;
            }
    
            // Prepare data to send
            var formData = {
                mensaje: vm.user.mensaje,
                nombre: vm.user.nombre,
                email: vm.user.email
            };
    
            // Use `postFormDataRequest` instead of JSON request
            CommonService.postFormDataRequest('https://www.psi.com.uy/api/sendemailon.php', formData).then(function (result) {
                if (result.data.trim() === "OK") {
                    $rootScope.$broadcast('alert-event', { type: 'success', msg: 'Formulario enviado con éxito' });
                } else {
                    $rootScope.$broadcast('alert-event', { type: 'danger', msg: result.data });
                }
            });
        };

        init();
        function init() {
        }
    }
})();