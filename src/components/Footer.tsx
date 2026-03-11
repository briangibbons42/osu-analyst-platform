export default function Footer() {
  return (
    <footer className="bg-dark-section text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-beaver-orange">
              OSU Finance Investment Club
            </h3>
            <p className="text-sm leading-relaxed text-gray-300">
              A learning-first equity research platform for Oregon State
              University&apos;s undergraduate finance investment club.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-beaver-orange">
              Resources
            </h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>
                <a
                  href="https://www.sec.gov/edgar/searchedgar/companysearch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  SEC EDGAR
                </a>
              </li>
              <li>
                <a
                  href="https://business.oregonstate.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  OSU College of Business
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-beaver-orange">
              Oregon State University
            </h3>
            <p className="text-sm text-gray-300">
              College of Business
              <br />
              Corvallis, OR 97331
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Oregon State University Finance
          Investment Club. Built for learning.
        </div>
      </div>
    </footer>
  );
}
