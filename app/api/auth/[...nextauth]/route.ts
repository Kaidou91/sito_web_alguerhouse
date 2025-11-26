import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'email'},
        password: {label: 'Password', type: 'password'}
      },
      async authorize(credentials) {
        if (credentials?.email) {
          return {id: 'user', email: credentials.email, role: 'admin'} as any;
        }
        return null;
      }
    })
  ],
  callbacks: {
    async session({session, token}) {
      if (token) {
        session.user = {id: token.sub!, email: token.email!, role: 'admin'} as any;
      }
      return session;
    }
  }
});

export {handler as GET, handler as POST};
