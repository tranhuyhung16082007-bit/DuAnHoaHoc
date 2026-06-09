export interface Lesson {
  id: string;
  title: string;
  pageNumber: number;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Curriculum {
  [grade: string]: Chapter[];
}

export const curriculumData: Curriculum = {
  "hoa-10": [
    {
      id: "chuong-1",
      title: "Chương 1: Cấu tạo nguyên tử",
      lessons: [
        { id: "bai-1", title: "Bài 1: Thành phần của nguyên tử", pageNumber: 13 },
        { id: "bai-2", title: "Bài 2: Nguyên tố hoá học", pageNumber: 18 },
        { id: "bai-3", title: "Bài 3: Cấu trúc lớp vỏ electron nguyên tử", pageNumber: 22 },
        { id: "bai-4", title: "Bài 4: Ôn tập chương 1", pageNumber: 27 }
      ]
    },
    {
      id: "chuong-2",
      title: "Chương 2: Bảng tuần hoàn các nguyên tố hoá học và định luật tuần hoàn",
      lessons: [
        { id: "bai-5", title: "Bài 5: Cấu tạo của bảng tuần hoàn", pageNumber: 30 },
        { id: "bai-6", title: "Bài 6: Xu hướng biến đổi một số tính chất", pageNumber: 35 },
        { id: "bai-7", title: "Bài 7: Xu hướng biến đổi thành phần và tính chất", pageNumber: 42 },
        { id: "bai-8", title: "Bài 8: Định luật tuần hoàn. Ý nghĩa bảng tuần hoàn", pageNumber: 46 },
        { id: "bai-9", title: "Bài 9: Ôn tập chương 2", pageNumber: 50 }
      ]
    },
    {
      id: "chuong-3",
      title: "Chương 3: Liên kết hoá học",
      lessons: [
        { id: "bai-10", title: "Bài 10: Quy tắc octet", pageNumber: 53 },
        { id: "bai-11", title: "Bài 11: Liên kết ion", pageNumber: 56 },
        { id: "bai-12", title: "Bài 12: Liên kết cộng hoá trị", pageNumber: 59 },
        { id: "bai-13", title: "Bài 13: Liên kết hydrogen và tương tác van der Waals", pageNumber: 65 },
        { id: "bai-14", title: "Bài 14: Ôn tập chương 3", pageNumber: 70 }
      ]
    },
    {
      id: "chuong-4",
      title: "Chương 4: Phản ứng oxi hoá – khử",
      lessons: [
        { id: "bai-15", title: "Bài 15: Phản ứng oxi hoá – khử", pageNumber: 73 },
        { id: "bai-16", title: "Bài 16: Ôn tập chương 4", pageNumber: 80 }
      ]
    },
    {
      id: "chuong-5",
      title: "Chương 5: Năng lượng hoá học",
      lessons: [
        { id: "bai-17", title: "Bài 17: Biến thiên enthalpy trong các phản ứng hoá học", pageNumber: 82 },
        { id: "bai-18", title: "Bài 18: Ôn tập chương 5", pageNumber: 88 }
      ]
    },
    {
      id: "chuong-6",
      title: "Chương 6: Tốc độ phản ứng",
      lessons: [
        { id: "bai-19", title: "Bài 19: Tốc độ phản ứng", pageNumber: 90 },
        { id: "bai-20", title: "Bài 20: Ôn tập chương 6", pageNumber: 97 }
      ]
    },
    {
      id: "chuong-7",
      title: "Chương 7: Nguyên tố nhóm halogen",
      lessons: [
        { id: "bai-21", title: "Bài 21: Nhóm halogen", pageNumber: 99 },
        { id: "bai-22", title: "Bài 22: Hydrogen halide. Muối halide", pageNumber: 106 },
        { id: "bai-23", title: "Bài 23: Ôn tập chương 7", pageNumber: 111 }
      ]
    }
  ],
  "hoa-11": [
    {
      id: "chuong-1",
      title: "Chương 1: Cân bằng hoá học",
      lessons: [
        { id: "bai-1", title: "Bài 1: Mở đầu về cân bằng hoá học", pageNumber: 6 },
        { id: "bai-2", title: "Bài 2: Sự điện li trong dung dịch nước", pageNumber: 13 },
        { id: "bai-3", title: "Bài 3: pH của dung dịch. Chuẩn độ", pageNumber: 20 }
      ]
    },
    {
      id: "chuong-2",
      title: "Chương 2: Nitrogen và Sulfur",
      lessons: [
        { id: "bai-4", title: "Bài 4: Đơn chất nitrogen", pageNumber: 26 },
        { id: "bai-5", title: "Bài 5: Một số hợp chất quan trọng của nitrogen", pageNumber: 30 },
        { id: "bai-6", title: "Bài 6: Sulfur và sulfur dioxide", pageNumber: 38 },
        { id: "bai-7", title: "Bài 7: Sulfuric acid và muối sulfate", pageNumber: 42 }
      ]
    },
    {
      id: "chuong-3",
      title: "Chương 3: Đại cương về hoá học hữu cơ",
      lessons: [
        { id: "bai-8", title: "Bài 8: Hợp chất hữu cơ và hoá học hữu cơ", pageNumber: 48 },
        { id: "bai-9", title: "Bài 9: Phương pháp tách biệt và tinh chế", pageNumber: 52 },
        { id: "bai-10", title: "Bài 10: Công thức phân tử hợp chất hữu cơ", pageNumber: 58 },
        { id: "bai-11", title: "Bài 11: Cấu tạo hoá học hợp chất hữu cơ", pageNumber: 62 }
      ]
    },
    {
      id: "chuong-4",
      title: "Chương 4: Hydrocarbon",
      lessons: [
        { id: "bai-12", title: "Bài 12: Alkane", pageNumber: 71 },
        { id: "bai-13", title: "Bài 13: Hydrocarbon không no", pageNumber: 76 },
        { id: "bai-14", title: "Bài 14: Arene (Hydrocarbon thơm)", pageNumber: 85 }
      ]
    },
    {
      id: "chuong-5",
      title: "Chương 5: Dẫn xuất halogen - Alcohol - Phenol",
      lessons: [
        { id: "bai-15", title: "Bài 15: Dẫn xuất halogen", pageNumber: 93 },
        { id: "bai-16", title: "Bài 16: Alcohol", pageNumber: 98 },
        { id: "bai-17", title: "Bài 17: Phenol", pageNumber: 106 }
      ]
    },
    {
      id: "chuong-6",
      title: "Chương 6: Hợp chất carbonyl - Carboxylic acid",
      lessons: [
        { id: "bai-18", title: "Bài 18: Hợp chất carbonyl", pageNumber: 114 },
        { id: "bai-19", title: "Bài 19: Carboxylic acid", pageNumber: 122 }
      ]
    }
  ],
  "hoa-12": [
    {
      id: "chuong-1",
      title: "Chương 1: Ester - Lipid",
      lessons: [
        { id: "bai-1", title: "Bài 1: Ester - Lipid", pageNumber: 6 },
        { id: "bai-2", title: "Bài 2: Xà phòng và chất giặt rửa", pageNumber: 14 },
        { id: "bai-3", title: "Bài 3: Ôn tập chương 1", pageNumber: 18 }
      ]
    },
    {
      id: "chuong-2",
      title: "Chương 2: Carbohydrate",
      lessons: [
        { id: "bai-4", title: "Bài 4: Giới thiệu về carbohydrate. Glucose và fructose", pageNumber: 20 },
        { id: "bai-5", title: "Bài 5: Saccharose và maltose", pageNumber: 25 },
        { id: "bai-6", title: "Bài 6: Tinh bột và cellulose", pageNumber: 28 },
        { id: "bai-7", title: "Bài 7: Ôn tập chương 2", pageNumber: 33 }
      ]
    },
    {
      id: "chuong-3",
      title: "Chương 3: Hợp chất chứa Nitrogen",
      lessons: [
        { id: "bai-8", title: "Bài 8: Amine", pageNumber: 35 },
        { id: "bai-9", title: "Bài 9: Amino acid và peptide", pageNumber: 41 },
        { id: "bai-10", title: "Bài 10: Protein và enzyme", pageNumber: 46 },
        { id: "bai-11", title: "Bài 11: Ôn tập chương 3", pageNumber: 49 }
      ]
    },
    {
      id: "chuong-4",
      title: "Chương 4: Polymer",
      lessons: [
        { id: "bai-12", title: "Bài 12: Đại cương về polymer", pageNumber: 51 },
        { id: "bai-13", title: "Bài 13: Vật liệu polymer", pageNumber: 56 },
        { id: "bai-14", title: "Bài 14: Ôn tập chương 4", pageNumber: 65 }
      ]
    },
    {
      id: "chuong-5",
      title: "Chương 5: Pin điện và Điện phân",
      lessons: [
        { id: "bai-15", title: "Bài 15: Thế điện cực và nguồn điện hoá học", pageNumber: 67 },
        { id: "bai-16", title: "Bài 16: Điện phân", pageNumber: 78 },
        { id: "bai-17", title: "Bài 17: Ôn tập chương 5", pageNumber: 85 }
      ]
    },
    {
      id: "chuong-6",
      title: "Chương 6: Đại cương về kim loại",
      lessons: [
        { id: "bai-18", title: "Bài 18: Cấu tạo và liên kết trong tinh thể kim loại", pageNumber: 87 },
        { id: "bai-19", title: "Bài 19: Tính chất vật lí và tính chất hoá học của kim loại", pageNumber: 89 },
        { id: "bai-20", title: "Bài 20: Kim loại trong tự nhiên và phương pháp tách kim loại", pageNumber: 94 },
        { id: "bai-21", title: "Bài 21: Hợp kim", pageNumber: 99 },
        { id: "bai-22", title: "Bài 22: Sự ăn mòn kim loại", pageNumber: 102 },
        { id: "bai-23", title: "Bài 23: Ôn tập chương 6", pageNumber: 106 }
      ]
    },
    {
      id: "chuong-7",
      title: "Chương 7: Nguyên tố nhóm IA và nhóm IIA",
      lessons: [
        { id: "bai-24", title: "Bài 24: Nguyên tố nhóm IA", pageNumber: 108 },
        { id: "bai-25", title: "Bài 25: Nguyên tố nhóm IIA", pageNumber: 116 },
        { id: "bai-26", title: "Bài 26: Ôn tập chương 7", pageNumber: 126 }
      ]
    },
    {
      id: "chuong-8",
      title: "Chương 8: Sơ lược về dãy kim loại chuyển tiếp thứ nhất và Phức chất",
      lessons: [
        { id: "bai-27", title: "Bài 27: Đại cương về kim loại chuyển tiếp dãy thứ nhất", pageNumber: 128 },
        { id: "bai-28", title: "Bài 28: Sơ lược về phức chất", pageNumber: 134 },
        { id: "bai-29", title: "Bài 29: Một số tính chất và ứng dụng của phức chất", pageNumber: 138 },
        { id: "bai-30", title: "Bài 30: Ôn tập chương 8", pageNumber: 142 }
      ]
    }
  ]
};
