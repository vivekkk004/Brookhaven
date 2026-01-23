import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-vintage-darkBrown text-vintage-cream mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <svg className="w-8 h-8 text-kindle-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18.5c-4.28-1.04-7.5-5.23-7.5-9.5V8.3l7.5-3.75 7.5 3.75v2.7c0 4.27-3.22 8.46-7.5 9.5zm-1-6.5h2v2h-2zm0-8h2v6h-2z" />
                            </svg>
                            <h3 className="font-bold text-2xl">Book<span className="text-kindle-500">Haven</span></h3>
                        </div>
                        <p className="text-sm text-vintage-cream/80">
                            Your trusted marketplace for discovering amazing books. Connect with readers and sellers worldwide in our vibrant literary community.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/books" className="text-vintage-cream/80 hover:text-vintage-cream transition-colors">
                                    Browse Books
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="text-vintage-cream/80 hover:text-vintage-cream transition-colors">
                                    Become a Seller
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-vintage-cream/80 hover:text-vintage-cream transition-colors">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="#" className="text-vintage-cream/80 hover:text-vintage-cream transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-vintage-cream/80 hover:text-vintage-cream transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-vintage-cream/80 hover:text-vintage-cream transition-colors">
                                    FAQs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="#" className="text-vintage-cream/80 hover:text-vintage-cream transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-vintage-cream/80 hover:text-vintage-cream transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-vintage-cream/80 hover:text-vintage-cream transition-colors">
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-vintage-cream/20 text-center text-sm text-vintage-cream/60">
                    <p>&copy; 2026 BookHaven. All rights reserved. Made with ❤️ for book lovers.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
