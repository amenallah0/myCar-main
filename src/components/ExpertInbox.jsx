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
  CircularProgress,
  Divider,
  Paper,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
  createTheme,
  ThemeProvider
} from '@mui/material';
import { format, isValid } from 'date-fns';
import { fr } from 'date-fns/locale';
import DownloadIcon from '@mui/icons-material/Download';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MessageIcon from '@mui/icons-material/Message';
import DescriptionIcon from '@mui/icons-material/Description';
import HeaderFive from './HeaderFive';

const ExpertInbox = () => {
  const [completedRequests, setCompletedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const theme = useTheme();

  // Créer un thème personnalisé avec les couleurs rouges
  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#ef4444',
        dark: '#991b1b',
        light: '#f87171',
      },
    },
  });

  const formatDate = (date) => {
    if (!date) return 'Date non disponible';
    try {
      // Si date est un tableau [année, mois, jour, ...]
      if (Array.isArray(date)) {
        const [year, month, day, hour = 0, minute = 0] = date;
        const dateObj = new Date(year, month - 1, day, hour, minute);
        return isValid(dateObj) ? format(dateObj, 'dd MMMM yyyy à HH:mm', { locale: fr }) : 'Date invalide';
      }
      // Si date est une chaîne ISO
      const dateObj = new Date(date);
      return isValid(dateObj) ? format(dateObj, 'dd MMMM yyyy à HH:mm', { locale: fr }) : 'Date invalide';
    } catch (err) {
      console.error('Error formatting date:', err);
      return 'Date invalide';
    }
  };

  useEffect(() => {
    const fetchCompletedRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/expertise-requests/expert/${user.id}`);
        const completedOnly = response.data.filter(request => request.status === 'COMPLETED');
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
            'Accept': 'application/pdf,application/octet-stream,image/*'
          }
        }
      );
      
      const contentType = response.headers['content-type'];
      const contentDisposition = response.headers['content-disposition'];
      let filename = response.headers['content-disposition'] ? 
        response.headers['content-disposition'].split('filename=')[1].replace(/["']/g, '') :
        `rapport-expertise-${requestId}${contentType.includes('pdf') ? '.pdf' : '.jpg'  }`;

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
      <ThemeProvider theme={customTheme}>
        <HeaderFive />
        <Box 
          display="flex" 
          flexDirection="column"
          justifyContent="center" 
          alignItems="center" 
          minHeight="80vh"
          sx={{
            background: `linear-gradient(45deg, ${alpha('#ef4444', 0.05)}, ${alpha('#f87171', 0.1)})`,
          }}
        >
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" sx={{ mt: 2, color: theme.palette.text.secondary }}>
            Chargement des rapports...
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={customTheme}>
        <HeaderFive />
        <Box 
          display="flex" 
          flexDirection="column"
          justifyContent="center" 
          alignItems="center" 
          minHeight="80vh"
          sx={{
            background: `linear-gradient(45deg, ${alpha('#ef4444', 0.05)}, ${alpha('#f87171', 0.1)})`,
          }}
        >
          <Typography color="error" variant="h5" gutterBottom>
            {error}
          </Typography>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Réessayer
          </Button>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={customTheme}>
      <HeaderFive />
      <Box sx={{ 
        minHeight: '100vh',
        background: `linear-gradient(45deg, ${alpha('#ef4444', 0.02)}, ${alpha('#f87171', 0.05)})`,
        pt: 4,
        pb: 8
      }}>
        <Container maxWidth="lg">
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              mb: 4, 
              background: 'linear-gradient(135deg, #ef4444 0%, #991b1b 100%)',
              color: 'white',
              borderRadius: 3,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(circle at 100% 0%, ${alpha('#fff', 0.1)} 0%, transparent 50%)`,
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Rapports d'expertise complétés
              </Typography>
              <Typography variant="subtitle1">
                {completedRequests.length} rapport{completedRequests.length > 1 ? 's' : ''} disponible{completedRequests.length > 1 ? 's' : ''}
              </Typography>
            </Box>
          </Paper>
          
          {completedRequests.length === 0 ? (
            <Paper 
              sx={{ 
                p: 6, 
                textAlign: 'center', 
                borderRadius: 3,
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: 'blur(8px)'
              }}
            >
              <DescriptionIcon sx={{ fontSize: 60, color: theme.palette.text.secondary, mb: 2 }} />
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Aucun rapport d'expertise complété
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Les rapports complétés apparaîtront ici
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {completedRequests.map((request) => (
                <Grid item xs={12} md={6} key={request.id}>
                  <Card 
                    sx={{ 
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      backgroundColor: alpha(theme.palette.background.paper, 0.8),
                      backdropFilter: 'blur(8px)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 3,
                        pb: 2,
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                      }}>
                        <Box sx={{ 
                          p: 1, 
                          borderRadius: 2, 
                          backgroundColor: alpha('#ef4444', 0.1),
                          mr: 2
                        }}>
                          <DirectionsCarIcon sx={{ color: '#ef4444' }} />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                          {request.car?.make || 'N/A'} {request.car?.model || ''}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CalendarTodayIcon sx={{ fontSize: 20, color: theme.palette.text.secondary, mr: 1 }} />
                            <Typography variant="body2" color="textSecondary">
                              {formatDate(request.requestDate)}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <PersonIcon sx={{ fontSize: 20, color: theme.palette.text.secondary, mr: 1 }} />
                            <Typography variant="body2" color="textSecondary">
                              {request.user?.username || 'N/A'}
                            </Typography>
                          </Box>
                        </Box>

                        {request.message && (
                          <Paper sx={{ 
                            p: 2, 
                            backgroundColor: alpha('#ef4444', 0.05),
                            borderRadius: 2
                          }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                              <MessageIcon sx={{ fontSize: 20, color: theme.palette.info.main, mt: 0.5 }} />
                              <Typography variant="body2" color="textSecondary">
                                {request.message}
                              </Typography>
                            </Box>
                          </Paper>
                        )}
                      </Box>

                      {request.report && (
                        <Box sx={{ mt: 3 }}>
                          <Paper sx={{ 
                            p: 2.5,
                            backgroundColor: alpha('#ef4444', 0.03),
                            borderRadius: 2,
                            border: `1px solid ${alpha('#ef4444', 0.1)}`
                          }}>
                            <Typography 
                              variant="subtitle2" 
                              gutterBottom 
                              color="primary" 
                              sx={{ 
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                mb: 2
                              }}
                            >
                              <DescriptionIcon sx={{ fontSize: 20 }} />
                              Détails du rapport
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                              {request.report.title && (
                                <Typography variant="body2">
                                  <strong>Titre:</strong> {request.report.title}
                                </Typography>
                              )}

                              {request.report.criticalData && (
                                <Typography variant="body2">
                                  <strong>Données critiques:</strong> {request.report.criticalData}
                                </Typography>
                              )}

                              {request.report.message && (
                                <Typography variant="body2">
                                  <strong>Message:</strong> {request.report.message}
                                </Typography>
                              )}
                            </Box>

                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'space-between',
                              mt: 3,
                              pt: 2,
                              borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                            }}>
                              <Chip 
                                label="Complété"
                                color="success"
                                size="small"
                                sx={{ 
                                  borderRadius: '6px',
                                  fontWeight: 500,
                                  backgroundColor: alpha(theme.palette.success.main, 0.1),
                                  color: theme.palette.success.dark,
                                  '& .MuiChip-label': { px: 2 }
                                }}
                              />
                              
                              {request.report.fileData && (
                                <Tooltip title={`Télécharger ${request.report.fileName || 'le rapport'}`}>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<DownloadIcon />}
                                    onClick={() => handleDownloadReport(request.id)}
                                    sx={{ 
                                      borderRadius: '8px',
                                      textTransform: 'none',
                                      boxShadow: 'none',
                                      px: 2,
                                      background: 'linear-gradient(135deg, #ef4444 0%, #991b1b 100%)',
                                      '&:hover': {
                                        boxShadow: `0 4px 12px ${alpha('#ef4444', 0.3)}`,
                                      }
                                    }}
                                  >
                                    Télécharger
                                  </Button>
                                </Tooltip>
                              )}
                            </Box>
                          </Paper>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ExpertInbox; 