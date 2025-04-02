// import axios from "axios";
//
// export const API_SERVER_HOST = 'http://localhost:8080';
//
// const prefix = `${API_SERVER_HOST}/todos`;
//
// export const getOne = async (tno) => {
//     const res = await axios.get(`${prefix}/${tno}`);
//     return res.data;
// }
//
// export const getList = async (pageParam) => {
//     const { page, size } = pageParam;
//     const res = await axios.get(`${prefix}/list?page=${page}&size=${size}`);
//     return res.data;
// }


import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/todos`;

export const getOne = async (tno) => {
    const res = await axios.get(`${prefix}/${tno}`);
    return res.data;
}

export const getList = async (pageParam) => {
    const { page, size } = pageParam;
    // JSON Server 페이지네이션 형식으로 변경
    const res = await axios.get(`${prefix}?_page=${page}&_limit=${size}`);

    // JSON Server는 헤더에 총 개수를 제공
    const totalCount = res.headers['x-total-count'] || 0;

    // Spring Boot 백엔드 응답 구조와 맞추기
    return {
        dtoList: res.data,
        pageNumList: generatePageNumbers(page, Math.ceil(totalCount / size)),
        pageRequestDTO: { page, size },
        prev: page > 1,
        next: page * size < totalCount,
        totalCount: parseInt(totalCount),
        prevPage: page > 1 ? page - 1 : 0,
        nextPage: page * size < totalCount ? page + 1 : 0,
        totalPage: Math.ceil(totalCount / size),
        current: page
    };
}

// 페이지 번호 생성 헬퍼 함수
function generatePageNumbers(currentPage, totalPages) {
    const start = Math.max(1, currentPage - 4);
    const end = Math.min(totalPages, start + 9);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}