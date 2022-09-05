interface IErrorOverlay {
  error: { file: string; line: string; msg: string };
}

const ErrorOverlay = (props: IErrorOverlay) => {
  const { error } = props;

  if (!error) {
    return null;
  }

  return (
    <div className="absolute inset-0 w-full h-full p-6 bg-red-50 text-red-700 mt-10 border-t border-gray-200 dark:border-gray-600 md:mt-0 md:border-0 top-0 bg-[#1e1e1e]">
      <h2 className="text-base leading-6 font-semibold text-red-900 mb-4 flex items-center">
        <span className="bg-red-500 rounded-full w-4 h-4 border-4 border-red-200" />
        <span >{error.file} Error</span>
        {typeof error.line !== 'undefined' ? (
          <dl className="text-sm leading-6 font-medium text-red-700 bg-red-100 rounded-full px-3 ml-4">
            <dt className="inline">Line</dt>{' '}
            <dd className="inline">{error.line}</dd>
          </dl>
        ) : null}
      </h2>
      <p className="font-mono text-sm leading-5">{error.msg}</p>
    </div>
  );
};
export default ErrorOverlay;
