//this files hold all the angular routes
var app = angular.module('appRoutes', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/',{
		templateUrl:'app/views/pages/home.html',
		authenticated:true
	})
	.when('/login',{
		templateUrl:'app/views/pages/login.html',
		authenticated:false
	})
	.when('/register',{
		templateUrl:'app/views/pages/register.html',
		controller: 'registerCntrl',
		controllerAs: 'register',
		authenticated:false
	})
	.when('/resend',{
		templateUrl:'app/views/pages/resend.html',
		controller:'resendCntrl',
		controllerAs:'resend',
		authenticated:false
	})
	.when('/forgotpassword',{
		templateUrl:'app/views/pages/forgotpassword.html',
		controller: 'passwordCntrl',
		controllerAs: 'password',
		authenticated:false
	})
	.when('/activate/:token',{
		templateUrl:'app/views/pages/activation.html',
		controller: 'emailCntrl',
		controllerAs: 'email',
		authenticated:false
	})
	.when('/resetpassword/:token',{
		templateUrl:'app/views/pages/resetpassword.html',
		controller : 'passwordrstCntrl',
		controllerAs : 'passwordrst',
		authenticated:false
	})
	.when('/admin/managebed',{
		templateUrl:'app/views/adminpages/addbed.html',
		authenticated:true,
		permission:['admin']
	})
	.when('/admin/home',{
		templateUrl:'app/views/adminpages/home.html',
		authenticated:true,
		permission:['admin']
	})
	.when('/admin/manageusers',{
		templateUrl:'app/views/adminpages/manageuser.html',
		authenticated:true,
		controller: 'manageUserCntrl',
		controllerAs: 'manageUser',
		permission:['admin']
	})
	.when('/logout',{
		templateUrl:'app/views/pages/logout.html',
		authenticated:true
	})
	.otherwise({redirectTo:'/'});
//function to remove defualut /#/ thing
	$locationProvider
	.html5Mode({
	  enabled: true,
	  requireBase: false
	})
	.hashPrefix('');

});
//this code section will check for user's authentication and authorization, prevent user from accessing other contents
app.run(['$rootScope','Auth','User','$location',function ($rootScope,Auth,User,$location) {
	$rootScope.$on('$routeChangeStart',function (event,next,current) {
		if (next.$$route !== undefined) { //checking whether routes are defined
		if(next.$$route.authenticated == true){ 
			if(!Auth.isLoggedIn()){
				event.preventDefault();
				$location.path('/login')
			}
			else if (next.$$route.permission) {
			    // Function: Get current user's permission to see if authorized on route
			    User.getPermission().then(function(data) {
			        // Check if user's permission matches at least one in the array
			        if (next.$$route.permission[0] !== data.data.permission) {
			            if (next.$$route.permission[1] !== data.data.permission) {
			                event.preventDefault(); // If at least one role does not match, prevent accessing route
			                $location.path('/'); // Redirect to home instead
			            }
			        }
			    });
			}

		}
		else if(next.$$route.authenticated == false){
			if(Auth.isLoggedIn()){
				event.preventDefault();
			}

		}
		
	}
	})
}]);