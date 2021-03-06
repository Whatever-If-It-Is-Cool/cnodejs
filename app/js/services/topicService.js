window.APP.factory('TopicListService', ['$http', '$q', 'TopicConfig', function($http, $q, TopicConfig) {
    var currentPage = 0;

    // 前往指定页
    var goPage = function (pageNum, tab) {
        pageNum = pageNum || 0;
        tab = tab || "all";

        var defer = $q.defer();

        $http.get(TopicConfig.listUrl.setParameters({
            limit: TopicConfig.limit,
            page: pageNum,
            tab: tab
        })).success(function (resp) {
            if (resp.success) {
                currentPage = pageNum;
                defer.resolve(resp.data);
            } else {
                defer.reject(new Error(resp.error_msg));
            }
        }).error(function (msg, code) {
            // FIXME 解析code 404: not found, 500: 服务器异常
            defer.reject(code);
        });
        return defer.promise;
    };

    // 下一页
    var nextPage = function (tab) {
        return goPage(currentPage + 1, tab);
    };

    return {
        goPage: goPage,
        nextPage: nextPage,
        getPageNum: function () {
            return currentPage;
        }
    };
}]);
