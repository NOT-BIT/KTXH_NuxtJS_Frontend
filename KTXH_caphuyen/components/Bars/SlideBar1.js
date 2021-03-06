export default [
    {
        icon: "mdi-home",
        title: "Trang chủ",
        to: "/"
    },
    {
        icon: "mdi-account-group-outline",
        title: "Quản Trị",
        children: [
            {
                icon: "mdi-city",
                title: "Khai Báo Đơn vị",
                to: "/quan-tri/don-vi"
            },
            {
                icon: "mdi-account-multiple",
                title: "Khai Báo Tác Nhân",
                to: "/quan-tri/tac-nhan"
            },
            {
                icon: "mdi-adjust",
                title: "Chức năng phần mềm",
                to: "/quan-tri/tac-nhan_chuc-nang-phan-mem"
            },
            {
                icon: "mdi-account-box-multiple",
                title: "Khai Báo Người dùng",
                to: "/quan-tri/User"
            }
        ]
    },
    {
        icon: "mdi-map-marker",
        title: "Quy Chuẩn",
        children: [
            {
                icon: "mdi-map-marker",
                title: "Tỉnh",
                to: "/quy-chuan/tinh"
            },
            {
                icon: "mdi-map-marker",
                title: "Huyện",
                to: "/quy-chuan/huyen"
            },
            {
                icon: "mdi-map-marker",
                title: "Xã",
                to: "/quy-chuan/xa"
            }
        ]
    },
    {
        icon: "mdi-map-marker",
        title: "Chỉ Tiêu",
        children: [
            {
                icon: "mdi-format-list-bulleted",
                title: "Chỉ tiêu KTXH",
                to: "/chi-tieu/chi-tieu"
            },
            {
                icon: "mdi-group",
                title: "Chỉ Tiêu Phân Tổ",
                to: "/chi-tieu/chi-tieu_phan-to"
            },
            {
                icon: "mdi-group",
                title: "Chỉ Tiêu Nhóm",
                to: "/chi-tieu/chi-tieu-nhom"
            },
            {
                icon: "mdi-select-group",
                title: "Chỉ Tiêu Phân Tổ",
                to: "/chi-tieu/chi-tieu-phan-to"
            },
            {
                icon: "mdi-playlist-edit",
                title: "Chỉ Tiêu Phân Tổ Chi Tiết",
                to: "/chi-tieu/chi-tieu-phan-to-chi-tiet"
            },
        ]
    },
    {
        icon: "mdi-timer",
        title: "Khai Báo Kỳ Báo Cáo",
        to: "/bao-cao/ky-bao-cao"
    }, 
    {
        icon: "mdi-file-document-box-multiple-outline",
        title: "Biểu Nhập Liệu",
        children: [
            {
                icon: "mdi-file-document-box",
                title: "Chi Tiêu",
                to: "/bieu-nhap-lieu/bieu-nhap-lieu_chi-tieu"
            },
            {
                icon: "mdi-file-chart",
                title: "Kỳ Báo Cáo",
                to: "/bieu-nhap-lieu/bieu-nhap-lieu_ky-bao-cao"
            },
            {
                icon: "mdi-clipboard-list-outline",
                title: "Trường Dữ Liệu",
                to: "/bieu-nhap-lieu/bieu-nhap-lieu_truong-du-lieu"
            }
        ]
    }
]