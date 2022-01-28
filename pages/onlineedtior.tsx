import { signIn, useSession } from 'next-auth/react';
import { useQueryString } from '@/lib/hooks';
import Editor from '@/components/editor';
import { useEffect } from 'react';

export default function OnlineEdtior() {
  const { data: session } = useSession();
  const queryObj = useQueryString();

  useEffect(() => {
    // fix 编辑器莫名其妙高度超高的问题
    const style = document.createElement('style');
    style.innerText = 'html{ overflow : hidden }';
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

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
    <Editor
      path={queryObj.path as string}
      accessToken={session.accessToken as string}
    />
  );
}

// export async function getStaticProps() {
//   const newsletters = await getAllFilesFrontMatter('newsletter');

//   return { props: { newsletters } };
// }
