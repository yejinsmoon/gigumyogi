import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import List from '../components/list';
import './createpost.css';
import FilterButton from '../components/filterbutton';
import Button from '../components/button';


function CreatePost() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_SERVER_URL;

  // 게시글의 제목, 내용, 카테고리를 저장할 상태
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(''); // 예: '모집', '공지' 등

  // 게시글을 제출하는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 서버에 전송할 데이터
    const postData = {
      title,
      content,
      category,
      roomId,
    };

    try {
      // 서버에 게시글 데이터 전송 (백엔드 엔드포인트에 맞게 수정)
      await axios.post(`${baseURL}/board`, postData);
      // 성공 시, 게시판 페이지로 리다이렉트
      navigate(`/room/${roomId}`);
    } catch (error) {
      console.error('게시글 작성 오류', error);
      // 오류 처리 로직 (예: 오류 메시지 표시)
    }
  };

  return (
    <div className='createpost'>
      <div className='body'>
        <div className='info'>
          <p className='heading'>카테고리를 선택해주세요</p>
        </div>
        <FilterButton />
        
        <div className='info'>
          <p className='heading'>게시글 제목을 입력해주세요.</p>
          <p> content </p>
        </div>
      </div>

    <form onSubmit={handleSubmit}>
        <label>
          카테고리:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="모집">모집</option>
            {/* 필요한 카테고리를 추가 */}
          </select>
        </label>
        <label>
          제목:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          내용:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <button type="submit">글 작성</button>
      </form>
      <Button
        variant={"primary"}
        color={"white"}
        size={"sm"}
        type="submit">게시글 등록하기</Button>
    </div>

  );
}

export default CreatePost;
