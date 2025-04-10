import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TenderService from '../../services/tender.service.js';
import {
  Tile,
  SkeletonText,
  InlineNotification,
  Button,
  Tag,
  Grid,
  Column,
  Link,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
  Loading,
  ContentSwitcher,
  Switch,
} from '@carbon/react';
import { Document, Download } from '@carbon/icons-react';
import './TenderDetails.scss';

const TenderDetails = () => {
  const { id } = useParams();
  const [tender, setTender] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const fetchTender = async () => {
      try {
        const tenderData = await TenderService.getTenderDetails(id);
        setTender(tenderData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTender();
  }, [id]);

  if (loading) {
    return (
      <div className="tender-details-container">
        <Loading description="Loading tender details" withOverlay={false} />
        <SkeletonText paragraph lineCount={10} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="tender-details-container">
        <InlineNotification
          kind="error"
          title="Error"
          subtitle={error}
          lowContrast
        />
        <Button kind="secondary" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  if (!tender) {
    return (
      <div className="tender-details-container">
        <InlineNotification
          kind="info"
          title="Not Found"
          subtitle="No tender details found."
          lowContrast
        />
        <Button kind="secondary" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  // Calculate tender status
  const today = new Date();
  const endDate = new Date(tender.end_date);
  const startDate = new Date(tender.start_date);
  let status = 'Active';
  let statusColor = 'green';

  if (today > endDate) {
    status = 'Closed';
    statusColor = 'red';
  } else if (today < startDate) {
    status = 'Upcoming';
    statusColor = 'blue';
  }

  return (
    <div className="tender-details-container">
      <Grid>
        <Column lg={16} md={8} sm={4}>
          <div className="tender-header">
            <div>
              <h1>{tender.tender_name}</h1>
              <div className="tender-meta">
                <Tag type={statusColor}>{status}</Tag>
                <span className="tender-client">{tender.client_name}</span>
              </div>
            </div>
            <Button kind="secondary" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>

          <ContentSwitcher
            className="tender-tabs"
            onChange={({ index }) =>
              setActiveTab(index === 0 ? 'details' : 'documents')
            }
          >
            <Switch name="details" text="Details" />
            <Switch name="documents" text="Documents" />
          </ContentSwitcher>

          {activeTab === 'details' && (
            <Tile className="tender-content">
              <Grid>
                <Column lg={8} md={4} sm={4}>
                  <div className="tender-main-info">
                    <h3>Tender Information</h3>
                    <StructuredListWrapper>
                      <StructuredListBody>
                        <StructuredListRow>
                          <StructuredListCell noWrap>Client</StructuredListCell>
                          <StructuredListCell>
                            {tender.client_name}
                          </StructuredListCell>
                        </StructuredListRow>
                        <StructuredListRow>
                          <StructuredListCell noWrap>
                            Start Date
                          </StructuredListCell>
                          <StructuredListCell>
                            {new Date(tender.start_date).toLocaleDateString()}
                          </StructuredListCell>
                        </StructuredListRow>
                        <StructuredListRow>
                          <StructuredListCell noWrap>
                            End Date
                          </StructuredListCell>
                          <StructuredListCell>
                            {new Date(tender.end_date).toLocaleDateString()}
                          </StructuredListCell>
                        </StructuredListRow>
                        <StructuredListRow>
                          <StructuredListCell noWrap>Status</StructuredListCell>
                          <StructuredListCell>
                            <Tag type={statusColor}>{status}</Tag>
                          </StructuredListCell>
                        </StructuredListRow>
                      </StructuredListBody>
                    </StructuredListWrapper>
                  </div>
                </Column>
                <Column lg={8} md={4} sm={4}>
                  {tender.description && (
                    <div className="tender-description">
                      <h3>Description</h3>
                      <p>{tender.description}</p>
                    </div>
                  )}
                </Column>
              </Grid>
            </Tile>
          )}

          {activeTab === 'documents' && (
            <Tile className="tender-content">
              <h3>Tender Documents</h3>
              {tender.tender_pdfs && tender.tender_pdfs.length > 0 ? (
                <ul className="document-list">
                  {tender.tender_pdfs.map((pdf) => (
                    <li key={pdf._id} className="document-item">
                      <Document size={20} />
                      <Link
                        href={pdf.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {pdf.file_name}
                      </Link>
                      <Button
                        kind="ghost"
                        size="sm"
                        renderIcon={Download}
                        iconDescription="Download document"
                        href={pdf.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No documents available for this tender.</p>
              )}
            </Tile>
          )}
        </Column>
      </Grid>
    </div>
  );
};

export default TenderDetails;
