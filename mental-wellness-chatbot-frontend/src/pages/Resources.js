import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useApi from '../hooks/useApi';

const ResourcesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const ResourcesHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const HeaderTitle = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.headings};
`;

const HeaderDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  max-width: 800px;
`;

const FilterSection = styled.div`
  background-color: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
`;

const FilterTitle = styled.h3`
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FilterGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FilterLabel = styled.h4`
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const EmergencyResourcesSection = styled.div`
  background-color: ${({ theme }) => `${theme.colors.error}10`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  border-left: 4px solid ${({ theme }) => theme.colors.error};
`;

const EmergencyTitle = styled.h2`
  color: ${({ theme }) => theme.colors.error};
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const EmergencyDescription = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const EmergencyResourcesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ResourceCard = styled.div`
  background-color: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: ${({ theme }) => theme.transitions.medium};
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.lg};
  }
`;

const ResourceContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ResourceType = styled.div`
  background-color: ${({ theme, type }) => {
    switch (type) {
      case 'quote': return `${theme.colors.primary}15`;
      case 'exercise': return `${theme.colors.secondary}15`;
      case 'technique': return `${theme.colors.info}15`;
      case 'resource': return `${theme.colors.warning}15`;
      default: return theme.colors.divider;
    }
  }};
  color: ${({ theme, type }) => {
    switch (type) {
      case 'quote': return theme.colors.primary;
      case 'exercise': return theme.colors.secondary;
      case 'technique': return theme.colors.info;
      case 'resource': return theme.colors.warning;
      default: return theme.colors.text;
    }
  }};
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-transform: capitalize;
`;

const ResourceTitle = styled.h3`
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.headings};
`;

const ResourceDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex: 1;
`;

const ResourceTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ResourceTag = styled.span`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textLight};
`;

const ResourceFooter = styled.div`
  margin-top: auto;
`;

const EmergencyCard = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
`;

const EmergencyInfo = styled.div`
  flex: 1;
`;

const EmergencyResourceTitle = styled.h4`
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.error};
`;

const EmergencyContact = styled.p`
  margin: 0;
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.textLight};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const PaginationButton = styled(Button)`
  margin: 0 ${({ theme }) => theme.spacing.xs};
`;

const PageNumber = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const Resources = () => {
  const { loading, getWellnessContent } = useApi();
  
  const [contentType, setContentType] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [resources, setResources] = useState([]);
  const [emergencyResources, setEmergencyResources] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Available content types
  const contentTypes = [
    { value: '', label: 'All' },
    { value: 'quote', label: 'Quotes' },
    { value: 'exercise', label: 'Exercises' },
    { value: 'technique', label: 'Techniques' },
    { value: 'resource', label: 'Resources' },
  ];
  
  // Available tags
  const tags = [
    'anxiety',
    'depression',
    'stress',
    'mindfulness',
    'sleep',
    'self_care',
    'motivation',
    'general',
  ];
  
  // Fetch resources
  useEffect(() => {
    const fetchResources = async () => {
      const tagsParam = selectedTags.length > 0 ? selectedTags : null;
      
      const response = await getWellnessContent(contentType, tagsParam, currentPage);
      
      if (!response.error) {
        setResources(response.data || []);
        setTotalPages(response.totalPages || 1);
        
        // Filter emergency resources
        const emergency = response.data?.filter(item => 
          item.contentType === 'resource' && 
          item.resource?.isEmergency === true
        ) || [];
        
        setEmergencyResources(emergency);
      }
    };
    
    fetchResources();
  }, [getWellnessContent, contentType, selectedTags, currentPage]);
  
  // Toggle content type filter
  const handleTypeFilter = (type) => {
    setContentType(type);
    setCurrentPage(1);
  };
  
  // Toggle tag filter
  const handleTagFilter = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
    setCurrentPage(1);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setContentType('');
    setSelectedTags([]);
    setCurrentPage(1);
  };
  
  // Render resource card based on content type
  const renderResourceCard = (resource) => {
    // Extract specific content based on type
    let content = {};
    
    switch (resource.contentType) {
      case 'quote':
        content = resource.quote || {};
        break;
      case 'exercise':
        content = resource.exercise || {};
        break;
      case 'technique':
        content = resource.technique || {};
        break;
      case 'resource':
        content = resource.resource || {};
        break;
      default:
        content = {};
    }
    
    return (
      <ResourceCard key={resource.id}>
        <ResourceContent>
          <ResourceType type={resource.contentType}>
            {resource.contentType}
          </ResourceType>
          
          <ResourceTitle>
            {content.title || (resource.contentType === 'quote' ? 'Quote' : '')}
          </ResourceTitle>
          
          <ResourceDescription>
            {resource.contentType === 'quote' 
              ? content.text 
              : (content.description || '')}
          </ResourceDescription>
          
          <ResourceTags>
            {resource.tags?.map((tag, index) => (
              <ResourceTag key={index}>{tag}</ResourceTag>
            ))}
          </ResourceTags>
          
          <ResourceFooter>
            {resource.contentType === 'resource' && content.url && (
              <Button 
                as="a" 
                href={content.url} 
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resource
              </Button>
            )}
            
            {resource.contentType !== 'resource' && (
              <Button>View Details</Button>
            )}
          </ResourceFooter>
        </ResourceContent>
      </ResourceCard>
    );
  };
  
  if (loading && resources.length === 0) {
    return (
      <Layout>
        <LoadingSpinner fullScreen text="Loading resources..." />
      </Layout>
    );
  }
  
  return (
    <Layout>
      <ResourcesContainer>
        <ResourcesHeader>
          <HeaderTitle>Mental Wellness Resources</HeaderTitle>
          <HeaderDescription>
            Explore our collection of quotes, exercises, techniques, and resources to support your mental wellbeing journey.
          </HeaderDescription>
        </ResourcesHeader>
        
        {emergencyResources.length > 0 && (
          <EmergencyResourcesSection>
            <EmergencyTitle>Emergency Resources</EmergencyTitle>
            <EmergencyDescription>
              If you're experiencing a crisis or need immediate help, please reach out to one of these resources:
            </EmergencyDescription>
            
            <EmergencyResourcesList>
              {emergencyResources.map((resource) => (
                <EmergencyCard key={resource.id}>
                  <EmergencyInfo>
                    <EmergencyResourceTitle>
                      {resource.resource?.title}
                    </EmergencyResourceTitle>
                    <div>{resource.resource?.description}</div>
                    <EmergencyContact>
                      {resource.resource?.url}
                    </EmergencyContact>
                  </EmergencyInfo>
                  
                  <Button 
                    as="a" 
                    href={resource.resource?.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="danger"
                  >
                    Get Help
                  </Button>
                </EmergencyCard>
              ))}
            </EmergencyResourcesList>
          </EmergencyResourcesSection>
        )}
        
        <FilterSection>
          <FilterTitle>Filter Resources</FilterTitle>
          
          <FilterGroup>
            <FilterLabel>Content Type</FilterLabel>
            <FilterOptions>
              {contentTypes.map((type) => (
                <Button 
                  key={type.value}
                  variant={contentType === type.value ? 'primary' : 'outline'}
                  size="small"
                  onClick={() => handleTypeFilter(type.value)}
                >
                  {type.label}
                </Button>
              ))}
            </FilterOptions>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Tags</FilterLabel>
            <FilterOptions>
              {tags.map((tag) => (
                <Button 
                  key={tag}
                  variant={selectedTags.includes(tag) ? 'primary' : 'outline'}
                  size="small"
                  onClick={() => handleTagFilter(tag)}
                >
                  {tag.replace('_', ' ')}
                </Button>
              ))}
            </FilterOptions>
          </FilterGroup>
          
          <Button 
            variant="text" 
            onClick={clearFilters}
            disabled={contentType === '' && selectedTags.length === 0}
          >
            Clear Filters
          </Button>
        </FilterSection>
        
        {resources.length > 0 ? (
          <>
            <ResourcesGrid>
              {resources.map(resource => renderResourceCard(resource))}
            </ResourcesGrid>
            
            {totalPages > 1 && (
              <Pagination>
                <PaginationButton 
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </PaginationButton>
                
                <PageNumber>
                  Page {currentPage} of {totalPages}
                </PageNumber>
                
                <PaginationButton 
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </PaginationButton>
              </Pagination>
            )}
          </>
        ) : (
          <NoResultsMessage>
            <h3>No resources found</h3>
            <p>Try adjusting your filters or check back later for new content.</p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </NoResultsMessage>
        )}
      </ResourcesContainer>
    </Layout>
  );
};

export default Resources;