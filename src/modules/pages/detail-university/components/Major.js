import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
//internal modules
import detailUniversityQuery from 'query/detail-university';
//internal components
import LoadingIcon from 'common/loading/LoadingIcon';
import Author from 'modules/pages/detail-university/common/Author';

function Major() {
  //STATE
  const { slug } = useParams();
  const { data, loading, error } = useQuery(detailUniversityQuery.GET_MAJOR, {
    variables: {
      id: slug,
    },
  });
  const contentMajor =
    !loading &&
    !error &&
    !!data &&
    data.allUniversities[0].detailUniversity.majors;

  return (
    <div className="container">
      <Author />

      <h1 className="container title-major">Ngành nghề đào tạo</h1>
      <table className="table-major">
        <thead>
          <th className="th-major" scope="col">
            Nhóm ngành
          </th>
          <th className="th-major" scope="col">
            Chuyên ngành
          </th>
          <th className="th-major" scope="col">
            Tổ hợp môn
          </th>
          {/* <th className="th-major" >Điểm chuẩn</th> */}
        </thead>
        {!!contentMajor ? (
          contentMajor.map((groupMajor, indexGroupMajor) => {
            return (
              <tbody className="tbody-major" key={indexGroupMajor}>
                {groupMajor.majors.map((branchMajor, indexBranchMajor) => (
                  <tr>
                    {indexBranchMajor === 0 && (
                      <th
                        className="td-major"
                        scope="row"
                        rowspan={groupMajor.majors.length}
                      >
                        {' '}
                        {groupMajor.name}{' '}
                      </th>
                    )}
                    <td className="td-major">{branchMajor.name}</td>
                    <td className="td-major">{branchMajor.subject}</td>
                  </tr>
                ))}
              </tbody>
            );
          })
        ) : (
          <LoadingIcon />
        )}
      </table>
      <button className="btn-major">Xem thêm</button>
      <div className="contact-major">
        <h4 className="title-contact-major">
          Để lại thông tin để chúng tôi liên lạc
        </h4>
        <p className="p-title-contact">
          Đừng lo, chúng tôi sẽ không gửi quá nhiều email
        </p>
        <input
          type="email"
          placeholder="Email"
          className="input-contact-major"
        />
        <button type="submit" className="btn-submit-major">
          Gửi thông tin !
        </button>
      </div>
    </div>
  );
}
export default Major;