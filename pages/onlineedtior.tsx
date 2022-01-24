import { signIn, useSession } from 'next-auth/react';
import { useQueryString } from '@/lib/hooks';
import Editor from '@/components/editor';

export default function OnlineEdtior() {
  const { data: session } = useSession();
  const queryObj = useQueryString();

  if (!session) {
    return (
      <div className="container mx-auto h-screen text-gray-900 dark:text-gray-100 flex items-center justify-center">
        <button
          onClick={() => signIn()}
          className="py-2 px-3 bg-white text-indigo-600 text-sm font-semibold rounded-md shadow-lg focus:outline-none"
        >
          登录
        </button>
      </div>
    );
  }

  return (
    <Editor path={queryObj.path as string} accessToken={session.accessToken as string} />
  );
}

// export async function getStaticProps() {
//   const newsletters = await getAllFilesFrontMatter('newsletter');

//   return { props: { newsletters } };
// }
