import React, { useState, useRef } from 'react';
import { useParams } from "react-router-dom";
import './index.css';

export default function Grid({ staticContext, fetchInitialData }) {
  const [repos, setRepos] = useState(() => {
    return staticContext
      ? staticContext.data
      : window.__INITIAL_DATA__;
  });

  const [loading, setLoading] = useState(!repos);
  const fetchNewRepos = useRef(!repos);

  const { id } = useParams();

  // 通过 Route 的 render 渲染的组件切换 :params 这种，组件不会销毁，
  // 当 server 端渲染后，再切换其他 popular 语言前，设置 fetchNewRepos.current 为 true，
  // 好让下次渲染可以再客户端获取数据
  React.useEffect(() => {
    if (fetchNewRepos.current) {
      setLoading(true);

      fetchInitialData(id)
        .then((repos) => {
          setRepos(repos)
          setLoading(false)
        });
    } else {
      fetchNewRepos.current = true;
    }
    
  }, [id, fetchNewRepos, fetchInitialData])

  if (loading) {
    return <i className='loading'>Loading...</i>
  }

  return (
    <ul className="popular">
      {repos.map(({ name, owner, stargazers_count, html_url }, i) => (
        <li key={name}>
          <h2>#{i + 1}</h2>
          <h3><a href={html_url}>{name}</a></h3>
          <p>by <a href={`https://github.com/${owner.login}`}>@{owner.login}</a></p>
          <p>{stargazers_count.toLocaleString()} stars</p>
        </li>
      ))}
    </ul>
  );
}
