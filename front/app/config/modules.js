function initModules($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        modules: [
            /* Controllers  */
            {
                name: 'adminCtrl',
                files: ['/front/app/controllers/adminCtrl.js']
            }
            /* Services  */


            /* Directives */

            /* Modules */

        ]
    });
}
