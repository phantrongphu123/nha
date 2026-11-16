import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  BatteryCharging,
  Check,
  ChevronDown,
  CirclePlay,
  Layers3,
  Menu,
  Move3d,
  Orbit,
  ScanLine,
  SunMedium,
  X,
  Zap,
} from 'lucide-react';
import './styles.css';

const services = [
  {
    number: '01',
    title: 'Mô phỏng 3D năng lượng',
    description: 'Nhìn thấy cách một hệ thống vận hành trước khi đầu tư — từ mái pin, inverter đến dòng điện trong nhà.',
    problem: 'Khó hình dung hiệu quả và cấu hình phù hợp với công trình thực tế.',
    applications: 'Nhà ở, biệt thự, văn phòng và công trình nhiều tải.',
    tech: 'Web 3D · Solar mapping · Energy flow',
    accent: 'lime',
  },
  {
    number: '02',
    title: 'Thiết kế & visualization',
    description: 'Biến dữ liệu khảo sát thành phối cảnh rõ ràng, dễ trình bày và dễ ra quyết định.',
    problem: 'Bản vẽ kỹ thuật thường khó trao đổi với người không chuyên.',
    applications: 'Chủ đầu tư, đội thi công, tư vấn kiến trúc.',
    tech: '3D modeling · Rendering · Technical view',
    accent: 'blue',
  },
  {
    number: '03',
    title: 'Giải pháp điện mặt trời',
    description: 'Thiết kế, thi công trọn gói hệ hòa lưới, hybrid và lưu trữ theo nhu cầu sử dụng.',
    problem: 'Hệ thống thiếu đồng bộ, khó kiểm soát chi phí và thời gian hoàn vốn.',
    applications: 'Gia đình, nhà xưởng, cửa hàng và doanh nghiệp.',
    tech: 'System design · Storage · Monitoring',
    accent: 'orange',
  },
  {
    number: '04',
    title: 'Trải nghiệm VR / AR',
    description: 'Đưa khách hàng đi qua không gian và thiết bị bằng trải nghiệm tương tác có mục đích.',
    problem: 'Cần thuyết phục nhiều bên trước khi triển khai một dự án phức tạp.',
    applications: 'Bất động sản, công nghiệp và đào tạo vận hành.',
    tech: 'Interactive web · VR · Digital twin',
    accent: 'violet',
  },
];

const projects = [
  {
    title: 'Nhà phố An Khánh',
    type: 'Hybrid · Gia đình',
    result: 'Giảm 68% điện lưới ban ngày',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Xưởng sản xuất Bắc Ninh',
    type: 'Hòa lưới · Doanh nghiệp',
    result: 'Tối ưu 124 MWh / năm',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Villa ven hồ',
    type: 'Digital twin · Visualization',
    result: 'Ra quyết định nhanh hơn 3×',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=85',
  },
];

const hotspots = [
  { id: 'roof', label: 'Mái pin', x: '27%', y: '31%', copy: '36 tấm pin tạo ra nguồn điện sạch cho toàn bộ hệ thống.' },
  { id: 'inverter', label: 'Inverter', x: '64%', y: '53%', copy: 'Bộ não chuyển đổi và tối ưu dòng điện theo tải thực tế.' },
  { id: 'battery', label: 'Pin lưu trữ', x: '47%', y: '75%', copy: 'Lưu điện ban ngày để dùng vào buổi tối hoặc khi mất lưới.' },
];

const simulationModes = [
  { id: 'day', label: 'Ban ngày', title: 'Điện mặt trời cấp cho nhà trước', copy: 'Dòng năng lượng chạy từ mái pin vào hệ thống, cấp điện cho nhà và sạc phần dư vào pin lưu trữ.' },
  { id: 'night', label: 'Buổi tối', title: 'Pin lưu trữ cấp điện cho nhà', copy: 'Năng lượng đã lưu được dùng cho các thiết bị buổi tối, giúp giảm phụ thuộc vào điện lưới.' },
  { id: 'backup', label: 'Mất điện', title: 'Hệ thống chuyển sang nguồn dự phòng', copy: 'Pin lưu trữ giữ các thiết bị quan trọng hoạt động ngay cả khi điện lưới bị ngắt.' },
];

function App() {
  const [activeService, setActiveService] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState('roof');
  const [showBattery, setShowBattery] = useState(true);
  const [showFlow, setShowFlow] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [simulationMode, setSimulationMode] = useState('day');
  const [menuOpen, setMenuOpen] = useState(false);

  const selectedHotspot = useMemo(
    () => hotspots.find((hotspot) => hotspot.id === activeHotspot) ?? hotspots[0],
    [activeHotspot],
  );
  const selectedMode = simulationModes.find((mode) => mode.id === simulationMode) ?? simulationModes[0];

  return (
    <div className="app">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Soliq Studio">
          <span className="brand-mark"><span /></span>
          <span>SOLIQ<span className="brand-muted">/STUDIO</span></span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Mở menu">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'}>
          <a href="#services" onClick={() => setMenuOpen(false)}>Dịch vụ</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>3D Experience</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Dự án</a>
          <a href="#technology" onClick={() => setMenuOpen(false)}>Công nghệ</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>Về chúng tôi</a>
        </nav>
        <a className="header-cta" href="#contact">Bắt đầu dự án <ArrowUpRight size={16} /></a>
      </header>

      <main id="top">
        <section className="hero section-shell">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> 3D ENERGY SYSTEMS</p>
            <h1>Biến năng lượng<br /><em>thành trải nghiệm.</em></h1>
            <p className="hero-lede">Soliq Studio kết hợp thiết kế hệ thống, dữ liệu và mô phỏng trực quan để giúp doanh nghiệp hiểu rõ hơn trước mỗi quyết định đầu tư.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#services">Khám phá dịch vụ <ArrowUpRight size={17} /></a>
              <a className="text-link" href="#experience"><span className="play-icon"><CirclePlay size={16} /></span> Xem mô phỏng 3D</a>
            </div>
            <div className="hero-proof">
              <div><strong>30<span>+</span></strong><span>MWp đã triển khai</span></div>
              <div><strong>2.5k<span>+</span></strong><span>công trình thực tế</span></div>
              <div><strong>25</strong><span>năm bảo hành</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="sun-glow" />
            <div className="hero-model">
              <div className="model-roof"><span /><span /><span /><span /><span /><span /></div>
              <div className="model-house"><div className="window-row"><i /><i /><i /></div><div className="door" /></div>
              <div className="model-ground" />
            </div>
            <div className="floating-label label-top"><SunMedium size={14} /> 8.6 kWp <small>Solar array</small></div>
            <div className="floating-label label-bottom"><Zap size={14} /> 12.4 kWh <small>Storage capacity</small></div>
            <span className="visual-grid" />
          </div>
        </section>

        <section className="intro-strip section-shell">
          <p>Không chỉ lắp đặt.<br /><strong>Chúng tôi làm cho hệ thống trở nên dễ hiểu.</strong></p>
          <div className="intro-detail"><span>01</span><p>Từ dữ liệu khảo sát đến mô phỏng và triển khai, mỗi điểm chạm đều được thiết kế để bạn nhìn thấy giá trị sớm hơn.</p></div>
        </section>

        <section className="services section-shell" id="services">
          <div className="section-heading">
            <div><p className="eyebrow"><span className="eyebrow-line" /> OUR SERVICES</p><h2>Giải pháp cho<br /><em>quyết định lớn.</em></h2></div>
            <p className="section-intro">Mỗi dịch vụ là một lớp năng lực độc lập — kết hợp lại thành trải nghiệm triển khai liền mạch, từ ý tưởng đến vận hành.</p>
          </div>
          <div className="service-layout">
            <div className="service-list">
              {services.map((service, index) => (
                <button className={activeService === index ? 'service-tab active' : 'service-tab'} key={service.number} onClick={() => setActiveService(index)}>
                  <span>{service.number}</span><strong>{service.title}</strong><ArrowUpRight size={18} />
                </button>
              ))}
            </div>
            <div className={`service-detail accent-${services[activeService].accent}`}>
              <div className="detail-top"><span>SERVICE {services[activeService].number}</span><Move3d size={20} /></div>
              <h3>{services[activeService].title}</h3>
              <p>{services[activeService].description}</p>
              <div className="detail-grid">
                <div><small>GIẢI QUYẾT</small><span>{services[activeService].problem}</span></div>
                <div><small>ỨNG DỤNG</small><span>{services[activeService].applications}</span></div>
                <div><small>CÔNG NGHỆ</small><span>{services[activeService].tech}</span></div>
              </div>
              <a className="button button-light" href="#contact">Xem chi tiết dịch vụ <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>

        <section className="experience section-shell" id="experience">
          <div className="experience-heading">
            <div><p className="eyebrow"><span className="eyebrow-line" /> 3D INTERACTIVE SHOWCASE</p><h2>Khám phá một<br /><em>hệ thống đang sống.</em></h2></div>
            <p>Không phải một hình ảnh tĩnh. Hãy bật từng lớp và chọn điểm trên mô hình để hiểu hệ thống vận hành như thế nào.</p>
          </div>
          <div className="experience-board">
            <div className="board-toolbar"><span><span className="status-dot" /> LIVE SIMULATION</span><span>HYBRID SYSTEM / 08.6 KWP</span></div>
            <div className={`simulation mode-${simulationMode} ${isPlaying ? 'is-playing' : ''}`}>
              <div className="sim-grid" />
              <div className="sim-sun" />
              <div className="sim-house"><div className="sim-panel-roof">{Array.from({ length: 12 }).map((_, index) => <i key={index} />)}</div><div className="sim-wall"><span className="sim-window" /><span className="sim-window second" /><span className="sim-door" /></div></div>
              {showBattery && <div className="sim-battery"><BatteryCharging size={20} /><span>BATTERY<br /><b>12.4 kWh</b></span></div>}
              {showFlow && <div className="energy-flow flow-one"><span /><span /><span /><span /></div>}
              {hotspots.map((hotspot) => <button key={hotspot.id} className={activeHotspot === hotspot.id ? 'hotspot active' : 'hotspot'} style={{ left: hotspot.x, top: hotspot.y }} onClick={() => setActiveHotspot(hotspot.id)} aria-label={hotspot.label}><span>{activeHotspot === hotspot.id ? <Check size={12} /> : '+'}</span></button>)}
              <div className="sim-caption"><span>{selectedMode.title}</span><p>{selectedMode.copy}</p><small>{selectedHotspot.label}: {selectedHotspot.copy}</small></div>
            </div>
            <div className="board-controls">
              <div className="mode-switcher" aria-label="Chọn trạng thái mô phỏng">{simulationModes.map((mode) => <button className={simulationMode === mode.id ? 'mode-active' : ''} key={mode.id} onClick={() => setSimulationMode(mode.id)}>{mode.label}</button>)}</div>
              <button onClick={() => setIsPlaying(!isPlaying)}><CirclePlay size={17} /> {isPlaying ? 'Đang phát animation' : 'Phát animation'}</button>
              <button className={showBattery ? 'control-active' : ''} onClick={() => setShowBattery(!showBattery)}><Layers3 size={16} /> Pin lưu trữ</button>
              <button className={showFlow ? 'control-active' : ''} onClick={() => setShowFlow(!showFlow)}><ScanLine size={16} /> Dòng năng lượng</button>
              <span className="drag-hint"><Orbit size={15} /> Kéo để xoay mô hình</span>
            </div>
          </div>
        </section>

        <section className="projects section-shell" id="projects">
          <div className="section-heading compact"><div><p className="eyebrow"><span className="eyebrow-line" /> SELECTED PROJECTS</p><h2>Những gì chúng tôi<br /><em>đã biến thành thật.</em></h2></div><a className="text-link" href="#contact">Xem tất cả dự án <ArrowUpRight size={16} /></a></div>
          <div className="project-grid">{projects.map((project, index) => <a className={index === 0 ? 'project-card featured' : 'project-card'} href="#contact" key={project.title}><div className="project-image"><img src={project.image} alt={project.title} loading="lazy" /><span className="project-index">0{index + 1}</span><span className="project-arrow"><ArrowUpRight size={18} /></span></div><div className="project-meta"><div><small>{project.type}</small><h3>{project.title}</h3></div><strong>{project.result}</strong></div></a>)}</div>
        </section>

        <section className="technology section-shell" id="technology">
          <div className="tech-copy"><p className="eyebrow"><span className="eyebrow-line" /> THE STACK</p><h2>Công nghệ đứng<br /><em>sau trải nghiệm.</em></h2><p>Chúng tôi chọn công nghệ vì nó giúp khách hàng hiểu nhanh hơn, không phải để phô diễn kỹ thuật.</p><a className="button button-primary" href="#contact">Trao đổi bài toán <ArrowUpRight size={16} /></a></div>
          <div className="tech-stack"><div className="tech-row"><span>01</span><div><strong>3D CORE</strong><p>Modeling · Rendering · Simulation</p></div><SunMedium /></div><div className="tech-row"><span>02</span><div><strong>INTERACTIVE</strong><p>WebGL · Three.js · Real-time data</p></div><Move3d /></div><div className="tech-row"><span>03</span><div><strong>DIGITAL SYSTEMS</strong><p>Digital twin · VR / AR · Monitoring</p></div><Zap /></div></div>
        </section>

        <section className="about section-shell" id="about">
          <div className="about-number">02</div><div><p className="eyebrow"><span className="eyebrow-line" /> ABOUT SOLIQ STUDIO</p><h2>Năng lực rõ ràng.<br /><em>Tác động đo được.</em></h2></div><div className="about-copy"><p>Soliq Studio là đội ngũ thiết kế và triển khai giải pháp năng lượng cho những công trình cần nhiều hơn một bộ thiết bị.</p><p>Chúng tôi kết nối tư duy hệ thống, thẩm mỹ trực quan và công nghệ tương tác để biến một bài toán phức tạp thành một quyết định tự tin.</p><a className="text-link" href="#contact">Khám phá năng lực <ArrowUpRight size={16} /></a></div>
        </section>

        <section className="contact section-shell" id="contact">
          <div><p className="eyebrow"><span className="eyebrow-line" /> START A PROJECT</p><h2>Bạn có một bài toán<br /><em>cần nhìn thấy rõ hơn?</em></h2><p>Chia sẻ vài thông tin về dự án. Đội ngũ Soliq sẽ phản hồi trong vòng một ngày làm việc.</p></div>
          <form className="contact-form" onSubmit={(event) => event.preventDefault()}><label>Họ và tên<input type="text" placeholder="Nguyễn Văn A" /></label><label>Email công việc<input type="email" placeholder="you@company.com" /></label><label>Doanh nghiệp<input type="text" placeholder="Tên công ty" /></label><label>Điều bạn đang cần<textarea placeholder="Mô tả ngắn về dự án..." rows="3" /></label><button className="button button-light" type="submit">Gửi yêu cầu tư vấn <ArrowUpRight size={16} /></button></form>
        </section>
      </main>
      <footer className="site-footer section-shell"><a className="brand" href="#top"><span className="brand-mark"><span /></span><span>SOLIQ<span className="brand-muted">/STUDIO</span></span></a><p>Designing clarity for a more energized world.</p><span>© 2025 Soliq Studio</span></footer>
    </div>
  );
}

export default App;

createRoot(document.getElementById('root')).render(<App />);
