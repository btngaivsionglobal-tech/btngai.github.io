import {
  Bell,
  BookOpen,
  Clock,
  CreditCard,
  Headphones,
  HelpCircle,
  Home,
  LibraryBig,
  Mail,
  Map,
  MapPin,
  Monitor,
  Phone,
  Search,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { LocalizedText } from "@/components/LanguageProvider";

export type MenuItem = {
  href: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: LucideIcon;
  tone: "teal" | "coral" | "amber" | "leaf" | "blue" | "rose";
};

export const menuItems: MenuItem[] = [
  {
    href: "/search",
    title: { vi: "Tra cứu tài liệu", en: "Catalog search" },
    description: {
      vi: "Tìm sách, báo, luận văn và vị trí trên kệ.",
      en: "Find books, journals, theses, and shelf locations.",
    },
    icon: Search,
    tone: "teal",
  },
  {
    href: "/map",
    title: { vi: "Sơ đồ thư viện", en: "Library map" },
    description: {
      vi: "Xem tầng, khu đọc, quầy mượn trả và khu máy tính.",
      en: "View floors, reading areas, service desk, and computers.",
    },
    icon: Map,
    tone: "coral",
  },
  {
    href: "/services",
    title: { vi: "Dịch vụ thư viện", en: "Library services" },
    description: {
      vi: "Làm thẻ, phòng học nhóm, hỗ trợ nghiên cứu.",
      en: "Cards, group rooms, borrowing, and research support.",
    },
    icon: LibraryBig,
    tone: "amber",
  },
  {
    href: "/events",
    title: { vi: "Thư viện số", en: "Digital library" },
    description: {
      vi: "Kho EBook, AudioBook và tài nguyên học tập trực tuyến.",
      en: "EBooks, AudioBooks, and online learning resources.",
    },
    icon: Monitor,
    tone: "leaf",
  },
  {
    href: "/guide",
    title: { vi: "Hướng dẫn sử dụng", en: "How to use" },
    description: {
      vi: "Các bước nhanh để tìm, mượn và trả tài liệu.",
      en: "Quick steps to search, borrow, and return materials.",
    },
    icon: HelpCircle,
    tone: "blue",
  },
  {
    href: "/contact",
    title: { vi: "Liên hệ hỗ trợ", en: "Support contact" },
    description: {
      vi: "Hotline, email, giờ mở cửa và vị trí quầy hỗ trợ.",
      en: "Hotline, email, opening hours, and support desk location.",
    },
    icon: Headphones,
    tone: "rose",
  },
];

export const homeSlides = [
  {
    title: { vi: "Chào mừng đến thư viện", en: "Welcome to the library" },
    description: {
      vi: "Không gian học tập mở, hiện đại và thân thiện cho mọi bạn đọc.",
      en: "An open, modern, and friendly study space for every reader.",
    },
    image: "/images/library-slide-welcome.png",
  },
  {
    title: { vi: "Tra cứu tài liệu nhanh chóng", en: "Search materials quickly" },
    description: {
      vi: "Nhập tên sách, tác giả hoặc chủ đề để xem ngay vị trí trên kệ.",
      en: "Enter a title, author, or topic to see the shelf location instantly.",
    },
    image: "/images/library-slide-search.png",
  },
  {
    title: { vi: "Sự kiện tuần này", en: "Events this week" },
    description: {
      vi: "Tham gia workshop kỹ năng thông tin và giờ đọc sách cộng đồng.",
      en: "Join information skills workshops and community reading sessions.",
    },
    image: "/images/library-slide-events.png",
  },
];

export const books = [
  {
    title: {
      vi: "Trí tuệ nhân tạo trong đời sống",
      en: "Artificial Intelligence in Everyday Life",
    },
    author: "Nguyễn Minh Anh",
    code: "005.1 NMA",
    area: {
      vi: "Tầng 2 - Kệ Công nghệ A03",
      en: "Floor 2 - Technology shelf A03",
    },
    status: { vi: "Còn sẵn", en: "Available" },
  },
  {
    title: { vi: "Thiết kế dịch vụ công", en: "Designing Public Services" },
    author: "Lê Hoàng Nam",
    code: "352.3 LHN",
    area: {
      vi: "Tầng 1 - Kệ Xã hội B12",
      en: "Floor 1 - Social sciences shelf B12",
    },
    status: { vi: "Còn sẵn", en: "Available" },
  },
  {
    title: {
      vi: "Lịch sử kiến trúc Việt Nam",
      en: "History of Vietnamese Architecture",
    },
    author: "Trần Quốc Bảo",
    code: "720.959 TQB",
    area: {
      vi: "Tầng 2 - Kệ Mỹ thuật C07",
      en: "Floor 2 - Arts shelf C07",
    },
    status: { vi: "Đang mượn", en: "Checked out" },
  },
  {
    title: {
      vi: "Phương pháp nghiên cứu khoa học",
      en: "Scientific Research Methods",
    },
    author: "Phạm Linh Chi",
    code: "001.4 PLC",
    area: {
      vi: "Tầng 1 - Kệ Tham khảo R02",
      en: "Floor 1 - Reference shelf R02",
    },
    status: { vi: "Còn sẵn", en: "Available" },
  },
];

export const floorZones = [
  {
    floor: { vi: "Tầng 1", en: "Floor 1" },
    name: { vi: "Quầy mượn trả", en: "Borrow & return desk" },
    icon: CreditCard,
    color: "bg-coral",
  },
  {
    floor: { vi: "Tầng 1", en: "Floor 1" },
    name: { vi: "Khu đọc mở", en: "Open reading area" },
    icon: BookOpen,
    color: "bg-teal",
  },
  {
    floor: { vi: "Tầng 1", en: "Floor 1" },
    name: { vi: "Quầy hỗ trợ", en: "Support desk" },
    icon: Headphones,
    color: "bg-amber",
  },
  {
    floor: { vi: "Tầng 2", en: "Floor 2" },
    name: { vi: "Khu sách chuyên ngành", en: "Subject collections" },
    icon: LibraryBig,
    color: "bg-leaf",
  },
  {
    floor: { vi: "Tầng 2", en: "Floor 2" },
    name: { vi: "Khu máy tính", en: "Computer area" },
    icon: Monitor,
    color: "bg-sky-500",
  },
  {
    floor: { vi: "Tầng 2", en: "Floor 2" },
    name: { vi: "Phòng học nhóm", en: "Group study rooms" },
    icon: Users,
    color: "bg-rose-500",
  },
];

export const services = [
  {
    title: { vi: "Mượn trả sách", en: "Borrow and return" },
    description: {
      vi: "Làm thủ tục mượn, gia hạn và trả sách tại quầy hoặc máy tự phục vụ.",
      en: "Borrow, renew, and return items at the desk or self-service station.",
    },
    icon: BookOpen,
    meta: { vi: "Hỗ trợ mỗi ngày", en: "Daily support" },
  },
  {
    title: { vi: "Làm thẻ thư viện", en: "Library card" },
    description: {
      vi: "Đăng ký mới, cấp lại thẻ và kích hoạt tài khoản tra cứu trực tuyến.",
      en: "Register, replace a card, and activate online catalog access.",
    },
    icon: CreditCard,
    meta: { vi: "5-10 phút", en: "5-10 minutes" },
  },
  {
    title: { vi: "Phòng học nhóm", en: "Group study rooms" },
    description: {
      vi: "Đặt phòng cho nhóm 3-8 người với bảng viết và màn hình trình chiếu.",
      en: "Book rooms for 3-8 people with a whiteboard and display screen.",
    },
    icon: Users,
    meta: { vi: "Đặt trước tại quầy", en: "Reserve at the desk" },
  },
  {
    title: { vi: "Hỗ trợ nghiên cứu", en: "Research support" },
    description: {
      vi: "Tư vấn tìm tài liệu, cơ sở dữ liệu học thuật và trích dẫn.",
      en: "Get help with sources, academic databases, and citations.",
    },
    icon: Search,
    meta: { vi: "Tầng 1", en: "Floor 1" },
  },
];

export const events = [
  {
    title: {
      vi: "Workshop: Tìm kiếm tài liệu học thuật",
      en: "Workshop: Finding academic sources",
    },
    date: { vi: "Thứ Sáu, 15:00", en: "Friday, 3:00 PM" },
    location: { vi: "Phòng đa năng Tầng 2", en: "Multipurpose room, Floor 2" },
  },
  {
    title: {
      vi: "Thông báo bảo trì hệ thống tra cứu",
      en: "Catalog system maintenance notice",
    },
    date: { vi: "Chủ Nhật, 08:00-10:00", en: "Sunday, 8:00-10:00 AM" },
    location: { vi: "Dịch vụ trực tuyến", en: "Online services" },
  },
  {
    title: { vi: "Tuần lễ sách mới tháng 5", en: "May new books week" },
    date: { vi: "13-19/05/2026", en: "May 13-19, 2026" },
    location: { vi: "Sảnh trung tâm Tầng 1", en: "Central hall, Floor 1" },
  },
];

export const guideSteps: LocalizedText[] = [
  {
    vi: "Chạm Tra cứu tài liệu và nhập tên sách, tác giả hoặc chủ đề.",
    en: "Tap Catalog search and enter a title, author, or topic.",
  },
  {
    vi: "Chọn tài liệu phù hợp để xem mã xếp giá và khu vực lưu trữ.",
    en: "Select a matching item to view its call number and shelf area.",
  },
  {
    vi: "Chạm Xem vị trí nếu cần xem đường đi đến kệ sách.",
    en: "Tap View location if you need directions to the shelf.",
  },
  {
    vi: "Mang sách đến quầy mượn trả hoặc máy tự phục vụ để hoàn tất.",
    en: "Bring the item to the service desk or self-service station.",
  },
  {
    vi: "Cần hỗ trợ, chạm Liên hệ hỗ trợ để xem hotline và vị trí quầy.",
    en: "Need help? Tap Support contact for the hotline and desk location.",
  },
];

export const contactCards = [
  {
    label: { vi: "Hotline", en: "Hotline" },
    value: { vi: "1900 1024", en: "1900 1024" },
    icon: Phone,
  },
  {
    label: { vi: "Email", en: "Email" },
    value: { vi: "hotro@thuvien.edu.vn", en: "support@library.edu.vn" },
    icon: Mail,
  },
  {
    label: { vi: "Giờ mở cửa", en: "Opening hours" },
    value: { vi: "07:30 - 21:00 hằng ngày", en: "7:30 AM - 9:00 PM daily" },
    icon: Clock,
  },
  {
    label: { vi: "Quầy hỗ trợ", en: "Support desk" },
    value: {
      vi: "Tầng 1, bên phải sảnh chính",
      en: "Floor 1, right side of the main hall",
    },
    icon: MapPin,
  },
];

export const notices = [
  {
    icon: Bell,
    text: {
      vi: "Vui lòng giữ trật tự tại khu đọc yên tĩnh.",
      en: "Please keep quiet in the silent reading area.",
    },
  },
  {
    icon: Home,
    text: {
      vi: "Khu tự học tầng 2 còn 12 chỗ trống.",
      en: "The self-study area on Floor 2 has 12 seats available.",
    },
  },
];
