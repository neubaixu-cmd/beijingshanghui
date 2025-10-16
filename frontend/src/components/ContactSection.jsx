import SectionHeader from './SectionHeader.jsx';

export default function ContactSection({ content }) {
  return (
    <section className="card" id="contact">
      <SectionHeader title="联系我们" subtitle="与北京商会取得联系" />
      <div className="contact">
        <div className="contact__info">
          {content.phone && (
            <div>
              <span className="contact__label">电话</span>
              <a href={`tel:${content.phone}`}>{content.phone}</a>
            </div>
          )}
          {content.email && (
            <div>
              <span className="contact__label">邮箱</span>
              <a href={`mailto:${content.email}`}>{content.email}</a>
            </div>
          )}
          {content.address && (
            <div>
              <span className="contact__label">地址</span>
              <p>{content.address}</p>
            </div>
          )}
          {content.wechat && (
            <div>
              <span className="contact__label">微信号</span>
              <p>{content.wechat}</p>
            </div>
          )}
          {content.officeHours && (
            <div>
              <span className="contact__label">办公时间</span>
              <p>{content.officeHours}</p>
            </div>
          )}
        </div>
        <div className="contact__cta">
          <p>欢迎预约拜访或提交合作意向，我们将尽快与您联系。</p>
          <a className="button button--primary" href={`mailto:${content.email || 'contact@beijingchamber.cn'}`}>
            发送邮件
          </a>
        </div>
      </div>
    </section>
  );
}
