function initStates($stateProvider, $ocLazyLoadProvider) {

    $stateProvider
        .state('index', {
            abstract: true,
            views: {
                layout: {
                    templateUrl: '/front/app/views/index.html'
                }
            }
        })
        .state('admin', {
            abstract: true,
            data: {
                isPublic: false,
                css: [ '/front/css/admin.css' ]
            },
            views: {
                layout: {
                    templateUrl: '/front/app/views/admin/index.html'
                }
            }
        })
        .state('home', {
            url: '/',
            parent:'index',
            data: {
                isPublic: true
            },
            views: {
                'content': {
                    templateUrl: '/front/app/views/public/pages/home.html'
                }
            }
        })
        .state('login', {
            url: '/admin',
            parent:'admin',
            data: {
                isPublic: false
            },
            views: {
                content: {
                    controller: 'adminCtrl',
                    templateUrl: '/front/app/views/admin/login.html',
                    resolve: resolveModule([ 'adminCtrl'])
                }
            }
        });
    function resolveModule(moduleName) {
        return {
            loadModules: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(moduleName);
            }]
        }
    }
}
