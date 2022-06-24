export const Footer = () => {
  return (
    <footer className="footer relative pt-1 border-b-2 border-blue-700">
      <div className="container mx-auto px-6">
        <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
          <div className="sm:w-2/3 text-center py-6 text-neutral-100">
            <h5 className="font-medium mb-2 uppercase">Riboura Veículos</h5>
            <p className="text-sm font-bold mb-2">
              © 2022 - by{" "}
              <a
                href="http://github.com/dlzzdev"
                target="_blank"
                rel="noreferrer"
              >
                dlzz1
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
