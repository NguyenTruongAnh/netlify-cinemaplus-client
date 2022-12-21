import './footer.css'

export default function Footer() {
    return (
        <div className="footer">
            <div className="grid wide">
                <div className="row no-gutters">
                    <div className="col c-o-1 c-10 m-o-0 m-8 l-8">
                        <h1 className="footer-heading">Introduce</h1>
                        <p className="footer-desc">CinemaPlus thuộc loại single page application (SPA) được làm trên framework ReactJs.</p>
                        <p className="footer-desc">Dữ liệu phim được gọi từ API movie open source gồm các bộ phim nổi tiếng được cập nhật mỗi ngày.</p>
                    </div>
                    <div className="col c-o-1 c-10 m-o-1 m-3 c-3">
                        <h1 className="footer-heading">Contact</h1>
                        <ul className="footer-list">
                            <li className="footer-item">
                                <a href="https://www.facebook.com/profile.php?id=100035256339240" target="_blank" rel="noreferrer">
                                    <i className="fab fa-facebook-square"></i>
                                    Facebook
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="https://www.facebook.com/profile.php?id=100035256339240" target="_blank" rel="noreferrer">
                                    <i className="fab fa-instagram-square"></i>
                                    Instagram
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="https://www.facebook.com/profile.php?id=100035256339240" target="_blank" rel="noreferrer">
                                    <i className="fab fa-twitter-square"></i>
                                    Twitter
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="grid wide">
                    <p className="footer-copyright">
                        Copyright © {new Date().getFullYear()} - Copyright belongs to Nguyễn Trường Anh - 51900699 & Nguyễn Võ Hoàng Vũ - 51900286
                    </p>
                </div>
            </div>
        </div>
    )
}
