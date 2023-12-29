import { useRouter } from 'next/router';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Layout from '../components/Layout.js';

export default function Page({ isDarkMode }) {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();

  if (user) {
    router.push('/profile');
  }

  // Login page display used Github as a provider and Theme Supa as a Layout design for sign in components 
  return (
    <Layout title="Sign in" description="User sign in" isDarkMode={isDarkMode}>
      <h1 className={`text-4xl font-semibold ${isDarkMode ? 'text-pink-300' : 'text-pink-800'} mb-4`}>
        Sign in
      </h1>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['github']}
      />
    </Layout>
  );
}
