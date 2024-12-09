import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ProfilePDFDocument from './ProfilePDFDocument';

const ProfilePDFGenerator = ({ userData, profileImage, educations, experiences, skills }) => (
  <div>
    <PDFDownloadLink
      document={<ProfilePDFDocument userData={userData} profileImage={profileImage} educations={educations} experiences={experiences} skills={skills} />}
      fileName="profile.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download PDF'
      }
    </PDFDownloadLink>
  </div>
);

export default ProfilePDFGenerator;
