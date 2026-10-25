import {createClient} from "@supabase/supabase-js";

const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRole=process.env.SUPABASE_SERVICE_ROLE_KEY;
const email=process.env.ADMIN_BOOTSTRAP_EMAIL;
const password=process.env.ADMIN_BOOTSTRAP_PASSWORD;

if(!url||!serviceRole||!email||!password){
  console.error("Missing the Supabase connection or administrator bootstrap environment variables.");
  process.exit(1);
}

const supabase=createClient(url,serviceRole,{auth:{autoRefreshToken:false,persistSession:false}});
const {data,error}=await supabase.auth.admin.createUser({email,password,email_confirm:true});
if(error){console.error(error.message);process.exit(1);}
const {error:profileError}=await supabase.from("admin_profiles").upsert({id:data.user.id,display_name:"Website Administrator",role:"admin"});
if(profileError){console.error(profileError.message);process.exit(1);}
console.log("Administrator account provisioned.");
