(function () {
	'use strict';
	angular.module('cService', []);
	angular.module('cService').factory('CommonService', CommonService);

	CommonService.$inject = ['$http', '$q'];

	function CommonService($http, $q) {
		var commonService = {
			getRequest: getRequest,
			getRequestCustom: getRequestCustom,
			postRequest: postRequest,
			postJsonRequest: postJsonRequest,
			postFormDataRequest: postFormDataRequest // ✅ NEW METHOD
		};

		return commonService;

		function getRequest(requestUrl, params, canceller) {
			var deferred = $.Deferred(),
				cancelTimeout = canceller || $q.defer();

			$http.get(requestUrl + (params !== undefined ? '?' + $.param(params) : ''), { timeout: cancelTimeout.promise })
				.then(function (data) {
					deferred.resolve(data);
				});
			return deferred.promise();
		}

		function getRequestCustom(requestUrl, params, canceller) {
			var deferred = $.Deferred(),
				cancelTimeout = canceller || $q.defer();

			var paramsget = params !== undefined ? '/' + $.param(params).replace('&', '/') : '';

			$http.get(requestUrl + paramsget, { timeout: cancelTimeout.promise }).then(function (data) {
				deferred.resolve(data);
			});

			return deferred.promise();
		}

		function postRequest(requestUrl, params) {
			var deferred = $.Deferred();

			$http.post(requestUrl, JSON.stringify(params)).then(function (data) {
				deferred.resolve(data);
			});

			return deferred.promise();
		}

		function postJsonRequest(requestUrl, params) {
			var deferred = $.Deferred();

			$http.post(requestUrl, params, { headers: { 'Content-Type': 'application/json;charset=utf-8' } })
				.then(function (data) {
					deferred.resolve(data);
				});

			return deferred.promise();
		}

		/** ✅ New function to send FormData instead of JSON */
		function postFormDataRequest(requestUrl, params) {
			var deferred = $.Deferred();

			// Convert `params` into FormData
			var formData = new FormData();
			for (var key in params) {
				if (params.hasOwnProperty(key)) {
					formData.append(key, params[key]);
				}
			}

			$http.post(requestUrl, formData, {
				headers: { 'Content-Type': undefined }, // Let the browser set content type
				transformRequest: angular.identity
			}).then(function (data) {
				deferred.resolve(data);
			});

			return deferred.promise();
		}
	}
})();
