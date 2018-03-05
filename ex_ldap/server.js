var	express				=		require('express'),
		bodyParser		=		require('body-parser'),
		passport		=		require('passport'),
		LdapStrategy	= 		require('passport-ldapauth'),
		jwt				= 	require('jsonwebtoken'),
		cors			= 	require('cors'),
		app				=		express();


var JWT_SECRET = 'secret';

var LDAP_OPTS = {
	server : {
		url : 'ldap://127.0.0.1',
		searchBase : 'ou=users,o=gautrans,dc=dot,dc=gov,dc=za',
		searchFilter : '(uid={{username}})',
		groupSearchBase : 'ou=groups,o=gautrans,dc=dot,dc=gov,dc=za',
		groupSearchFilter : '(uniqueMember={{dn}})',
		groupSearchAttributes : ['cn']
	}
}

var claim_template = {
	uid : '',
	role : ''
}

passport.use(new LdapStrategy(LDAP_OPTS));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(passport.initialize());
app.use(cors());

app.get('/', function(request,respond){
	respond.json({ route : '/', method : 'GET'});
})

app.post('/login',passport.authenticate('ldapauth', {session : false}), function(request,response){		
	var jwt_payload = {};
	let user = Object.assign({},request.user);
	let claim = Object.assign({},claim_template);
	claim.uid = user.uid;	

	jwt_payload.uid = user.uid;
	jwt_payload.full_name = user.cn;
	jwt_payload.email = user.mail;
	jwt_payload.role = user.givenName;
	
	jwt.sign(jwt_payload,JWT_SECRET,{},function(err,val){
		response.json({token : val, data : jwt_payload});	
	});
})

var server = app.listen(3000, function(){
	
	var host = server.address().address;
	var port = server.address().port;

	console.log('Application listening on http://%s:%s',host,port);
});