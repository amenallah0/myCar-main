import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/userContext';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Box,
  Chip,
  Button,
  CircularProgress
} from '@mui/material';
import { format, isValid } from 'date-fns';
import { fr } from 'date-fns/locale';
import DownloadIcon from '@mui/icons-material/Download';
import HeaderFive from './HeaderFive';

const ExpertInbox = () => {
  const [completedRequests, setCompletedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();

  const formatDate = (date) => {
    if (!date) return 'Date non disponible';
    try {
      const dateObj = new Date(date);
      return isValid(dateObj) ? format(dateObj, 'dd MMMM yyyy', { locale: fr }) : 'Date invalide';
    } catch (err) {
      console.error('Error formatting date:', err);
      return 'Date invalide';
    }
  };

  useEffect(() => {
    const fetchCompletedRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/expertise-requests/expert/${user.id}`);
        console.log('Response data:', response.data);
        const completedOnly = response.data.filter(request => request.status === 'COMPLETED');
        console.log('Completed requests:', completedOnly);
        setCompletedRequests(completedOnly);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching completed requests:', err);
        setError('Erreur lors du chargement des rapports d\'expertise');
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchCompletedRequests();
    }
  }, [user]);

  const handleDownloadReport = async (requestId) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/expertise-requests/${requestId}/report/download`,
        { 
          responseType: 'blob',
          headers: {
            'Accept': 'application/pdf,application/octet-stream'
          }
        }
      );
      
      const contentType = response.headers['content-type'];
      const contentDisposition = response.headers['content-disposition'];
      let filename = `rapport-expertise-${requestId}.pdf`;
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1].replace(/['"]/g, '');
        }
      }

      const blob = new Blob([response.data], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      
      document.body.appendChild(link);
      link.click();
      
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading report:', err);
      if (err.response?.status === 404) {
        alert('Le rapport n\'est pas disponible pour le téléchargement');
      } else {
        alert('Erreur lors du téléchargement du rapport: ' + (err.message || 'Erreur inconnue'));
      }
    }
  };

  if (loading) {
    return (
      <>
        <HeaderFive />
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <CircularProgress />
        </Box>
      </>
    );
  }

  if (error) {
    return (
      <>
        <HeaderFive />
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <Typography color="error">{error}</Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <HeaderFive />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Rapports d'expertise complétés
        </Typography>
        
        {completedRequests.length === 0 ? (
          <Typography variant="body1">
            Aucun rapport d'expertise complété pour le moment.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {completedRequests.map((request) => (
              <Grid item xs={12} md={6} key={request.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Expertise pour {request.car?.brand || 'N/A'} {request.car?.model || ''}
                    </Typography>
                    
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Date de demande: {formatDate(request.requestDate)}
                    </Typography>
                    
                    <Typography variant="body2" gutterBottom>
                      Client: {request.user?.firstName || 'N/A'} {request.user?.lastName || ''}
                    </Typography>
                    
                    {request.report && (
                      <>
                        <Typography variant="body2" gutterBottom>
                          Rapport créé le: {formatDate(request.report.submissionDate)}
                        </Typography>
                        
                        <Box mt={2}>
                          <Chip 
                            label="Complété"
                            color="success"
                            size="small"
                            sx={{ mr: 1 }}
                          />
                          
                          {request.report.fileData && (
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<DownloadIcon />}
                              onClick={() => handleDownloadReport(request.id)}
                            >
                              Télécharger le rapport
                            </Button>
                          )}
                        </Box>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default ExpertInbox; 