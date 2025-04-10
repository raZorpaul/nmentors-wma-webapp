import React, { useEffect, useState } from 'react';
import TenderService from '../../services/tender.service.js';
import { Link } from 'react-router-dom';
import {
  Tile,
  Button,
  SkeletonText,
  InlineNotification,
} from '@carbon/react';
import './Feednav.scss'

const FeedNav = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const data = await TenderService.getActiveTenders();
        setTenders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTenders();
  }, []);

  if (loading) {
    return (
      <div className="feed-nav">
        <SkeletonText paragraph lineCount={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="feed-nav">
        <InlineNotification
          kind="error"
          title="Error"
          subtitle={error}
          lowContrast
        />
      </div>
    );
  }

  return (
    <div className="feed-nav">
      <h2>Active Tenders</h2>
      {tenders.length === 0 ? (
        <p>No active tenders available at the moment.</p>
      ) : (
        <div className="tender-feed">
          {tenders.map((tender) => (
            <Tile key={tender._id} className="tender-tile">
              <h3>{tender.tender_name}</h3>
              <p>Client: {tender.client_name}</p>
              <p>
                Start Date: {new Date(tender.start_date).toLocaleDateString()}
              </p>
              <p>
                End Date: {new Date(tender.end_date).toLocaleDateString()}
              </p>
              <Link to={`/tenders/${tender._id}`}>
                <Button size="small" kind="primary">
                  View Details
                </Button>
              </Link>
            </Tile>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedNav;
