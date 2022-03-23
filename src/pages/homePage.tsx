import React from 'react';
import { Link } from 'wouter';
import packageJson from '../../package.json';
import { Routes } from '../constant/routes';

export const HomePage: React.FC = () => {
    return (
        <div id="wrapper" className="forty">
            <section id="banner" className="style2">
                <div className="inner">
                    <span className="image">
                        <img src="images/pic07.jpg" alt="" />
                    </span>
                    <header className="major">
                        <h1>Crazy Chat Overlays!</h1>
                    </header>
                    <div className="content">
                        <p>
                            Chat overlays are getting boring, lets customize and bring the craziness back! 🤪
                        </p>
                    </div>
                    <ul className="actions">
                        <li><Link href={Routes.setting} className="button next">Get Started</Link></li>
                    </ul>
                </div>
            </section>

            <div id="main">
                <section id="one">
                    <div className="inner">
                        <header className="major">
                            <h2>Do you want a crazier chat overlay!?</h2>
                        </header>
                        <p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis magna sed nunc rhoncus condimentum sem. In efficitur ligula tate urna. Maecenas massa vel lacinia pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis libero. Nullam et orci eu lorem consequat tincidunt vivamus et sagittis magna sed nunc rhoncus condimentum sem. In efficitur ligula tate urna.</p>
                    </div>
                </section>

                <section id="two" className="spotlights">
                    <section>
                        <img src="./assets/img/bttv.gif" alt="BetterTTV" style={{ marginLeft: '9em' }} />
                        <div className="content">
                            <div className="inner">
                                <header className="major">
                                    <h3>Awesome support</h3>
                                </header>
                                <p>
                                    This chat overlay has support for all of your chatters' badges emotes etc.<br />
                                    We support BetterTTV emotes too!
                                </p>
                            </div>
                        </div>
                    </section>
                    <section>
                        <a href="generic.html" className="image">
                            <img src="images/pic09.jpg" alt="" data-position="top center" />
                        </a>
                        <div className="content">
                            <div className="inner">
                                <header className="major">
                                    <h3>Rhoncus magna</h3>
                                </header>
                                <p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis magna sed nunc rhoncus condimentum sem. In efficitur ligula tate urna. Maecenas massa sed magna lacinia magna pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis tempus.</p>
                                <ul className="actions">
                                    <li><a href="generic.html" className="button">Learn more</a></li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section>
                        <a href="generic.html" className="image">
                            <img src="images/pic10.jpg" alt="" data-position="25% 25%" />
                        </a>
                        <div className="content">
                            <div className="inner">
                                <header className="major">
                                    <h3>Sed nunc ligula</h3>
                                </header>
                                <p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis magna sed nunc rhoncus condimentum sem. In efficitur ligula tate urna. Maecenas massa sed magna lacinia magna pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis tempus.</p>
                                <ul className="actions">
                                    <li><a href="generic.html" className="button">Learn more</a></li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </section>

                <section id="three">
                    <div className="inner">
                        <header className="major">
                            <h2>Massa libero</h2>
                        </header>
                        <p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus pharetra. Pellentesque condimentum sem. In efficitur ligula tate urna. Maecenas laoreet massa vel lacinia pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus amet pharetra et feugiat tempus.</p>
                        <ul className="actions">
                            <li><a href="generic.html" className="button next">Get Started</a></li>
                        </ul>
                    </div>
                </section>

            </div>

            <footer id="footer">
                <div className="inner">
                    <ul className="copyright">
                        <li>&copy; AssistantApps</li><li> {packageJson?.version ?? '1.0.0'}</li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}
