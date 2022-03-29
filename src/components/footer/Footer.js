import './Footer.css';

const Footer = () => {

   return (

      <div className="footer__container">
         <div className='footer__adress'>
            <a href='#' className='links'>Номер телефона: +79061234567</a>
            <a href='https://yandex.ru/maps/43/kazan/geo/ulitsa_bratyev_kasimovykh/23992033/?ll=49.198195%2C55.756285&utm_source=main_stripe_big&z=15.27' className='links'>Адрес: город Казань, ул. Братьев Касимовых</a>
         </div>
         <div className='social__media'>
            <div><a href='https://vk.com/' className='vk social__item'><img src="https://img.icons8.com/ios/50/000000/vk-circled--v2.png" /></a></div>
            <div><a href='https://www.instagram.com/' className='instagram social__item'><img src="https://img.icons8.com/ios/50/000000/instagram-new--v2.png" /></a></div>
            <div><a href='https://twitter.com/' className='twitter social__item'><img src="https://img.icons8.com/ios/50/000000/twitter-circled--v4.png" /></a></div>
            <div><a href='https://ru-ru.facebook.com/' className='facebook social__item'><img src="https://img.icons8.com/ios/50/000000/facebook--v2.png" /></a></div>
         </div>
      </div>

   )
}
export default Footer;
