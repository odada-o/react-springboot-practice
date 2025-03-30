import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

/**
 * 문자열 파라미터를 정수로 변환, 값이 없으면 기본값 반환
 * @param {string|null} param - 변환할 파라미터 값
 * @param {number} defaultValue - 기본값
 * @returns {number} 변환된 정수 값
 */
const getNum = (param, defaultValue) => {
    // null, undefined, NaN 등을 처리하기 위한 검증 추가
    const num = parseInt(param);
    return isNaN(num) ? defaultValue : num;
};

/**
 * 페이지 네비게이션을 위한 커스텀 훅
 * @returns {Object} 페이지 네비게이션 관련 함수와 상태
 */
const useCustomMove = () => {
    const navigate = useNavigate();
    const [queryParams] = useSearchParams();

    // 현재 페이지 정보 추출
    const page = getNum(queryParams.get("page"), 1);
    const size = getNum(queryParams.get("size"), 10);

    // 기본 쿼리 파라미터 생성
    const queryDefault = createSearchParams({ page, size }).toString();

    /**
     * 목록 페이지로 이동하는 함수
     * @param {Object} pageParam - 페이지 관련 파라미터
     * @param {number} [pageParam.page] - 페이지 번호
     * @param {number} [pageParam.size] - 페이지 크기
     */
    const moveToList = (pageParam) => {
        // 페이지 파라미터가 제공되면 해당 값 사용, 아니면 기본값 사용
        const queryStr = pageParam
            ? createSearchParams({
                page: getNum(pageParam.page, 1),
                size: getNum(pageParam.size, 10),
            }).toString()
            : queryDefault;

        navigate({
            pathname: "../list",
            search: queryStr
        });
    };

    /**
     * 상세 페이지로 이동하는 함수
     * @param {number|string} id - 상세 페이지 아이디
     */
    const moveToDetail = (id) => {
        navigate({
            pathname: `../read/${id}`,
            search: queryDefault
        });
    };

    /**
     * 수정 페이지로 이동하는 함수
     * @param {number|string} id - 수정할 아이템의 아이디
     */
    const moveToModify = (id) => {
        navigate({
            pathname: `../modify/${id}`,
            search: queryDefault
        });
    };

    return {
        moveToList,
        moveToDetail,
        moveToModify,
        page,
        size
    };
};

export default useCustomMove;