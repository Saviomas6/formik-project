import styled from "styled-components";
export const FilterDropDownMainLayout = styled.div``;
export const FilterDropDownLayout = styled.div`
  position: relative;
  z-index: 1;
`;

export const FilterDropDownSelectButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
  width: 100%;
`;

export const FilterDropDownSelectButton = styled.div`
  width: 100%;
  height: 44px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 16px;
  color: #000;
  display: flex;
  align-items: center;
  background-color: #ececec;
  cursor: pointer;
  @media screen and (max-width: 560px) {
    height: 35px;
    font-size: 14px;
  }
`;
export const FilterDropDownArrowIcon = styled.div`
  margin: 1px 0 0 5px;
`;
export const FilterDropDownContainer = styled.div`
  width: 100%;
  min-height: 166px;
  font-weight: 400;
  font-size: 16px;
  border-radius: 14px;
  color: #000;
  background-color: #f6f6f6;
  position: absolute;
  top: 15px;
  z-index: -1;
  @media screen and (max-width: 560px) {
    top: 8px;
    font-size: 14px;
  }
`;
export const FilterDropDownWrapper = styled.div`
  margin-top: 40px;
`;
export const FilterDropDownBorder = styled.div`
  border-bottom: 0.5px solid #808080;
  :last-child {
    border-bottom: none;
  }
`;
export const FilterDropDownSelect = styled.div`
  height: 44px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  padding: 0 25px;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  :hover {
    background-color: #4de3f8;
  }
  @media screen and (max-width: 560px) {
    height: 35px;
  }
`;
export const FilterDropDownSelectIcon = styled.div`
  display: flex;
  margin-right: 10px;
`;
