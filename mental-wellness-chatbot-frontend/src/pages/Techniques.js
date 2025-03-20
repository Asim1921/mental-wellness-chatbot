import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useApi from '../hooks/useApi';

const TechniquesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const PageTitle = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.headings};
`;

const PageDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  max-width: 800px;
`;

const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.foreground};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
`;

const FilterLabel = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

const TechniquesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const TechniqueCard = styled.div`
  background-color: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: ${({ theme }) => theme.transitions.medium};
  border-left: 4px solid ${({ theme }) => theme.colors.info};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.lg};
  }
`;

const TechniqueHeader = styled.div`
  background-color: ${({ theme }) => `${theme.colors.info}10`};
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => `${theme.colors.info}30`};
`;

const TechniqueTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.headings};
`;

const TechniqueContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TechniqueDescription = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const TechniqueTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TechniqueTag = styled.span`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textLight};
`;

const TechniqueFooter = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BenefitsList = styled.ul`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-left: ${({ theme }) => theme.spacing.xl};
`;

const BenefitItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textLight};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
  gap: ${({ theme }) => theme.spacing.md};
`;

const PageNumber = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

// Technique detail modal
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
  padding: ${({ theme }) => theme.spacing.md};
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.boxShadow.xl};
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  background-color: ${({ theme }) => `${theme.colors.info}10`};
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => `${theme.colors.info}30`};
  position: sticky;
  top: 0;
  z-index: 1;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.headings};
`;

const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  flex: 1;
`;

const ModalFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
`;

const InstructionsSection = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const ContraindicationsSection = styled.div`
  background-color: ${({ theme }) => `${theme.colors.warning}10`};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin: ${({ theme }) => theme.spacing.md} 0;
  border-left: 3px solid ${({ theme }) => theme.colors.warning};
`;

const Techniques = () => {
  const { loading, error, getWellnessContent } = useApi();
  const [techniques, setTechniques] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tags, setTags] = useState([]);
  
  // Fetch common tags for filtering
  useEffect(() => {
    const fetchTags = async () => {
      const response = await getWellnessContent('technique');
      
      if (!response.error && response.data) {
        const allTags = response.data.flatMap(item => 
          item.tags?.map(t => t.tag) || []
        );
        
        // Get unique tags
        const uniqueTags = [...new Set(allTags)];
        setTags(uniqueTags);
      }
    };
    
    fetchTags();
  }, [getWellnessContent]);
  
  // Fetch techniques with filters
  useEffect(() => {
    const fetchTechniques = async () => {
      const tagFilter = selectedTag ? [selectedTag] : null;
      const response = await getWellnessContent('technique', tagFilter, currentPage);
      
      if (!response.error) {
        setTechniques(response.data || []);
        setTotalPages(response.totalPages || 1);
      }
    };
    
    fetchTechniques();
  }, [getWellnessContent, selectedTag, currentPage]);
  
  const handleTagChange = (tag) => {
    setSelectedTag(tag === selectedTag ? '' : tag);
    setCurrentPage(1);
  };
  
  const openTechniqueModal = (technique) => {
    setSelectedTechnique(technique);
  };
  
  const closeTechniqueModal = () => {
    setSelectedTechnique(null);
  };
  
  if (loading && techniques.length === 0) {
    return (
      <Layout>
        <LoadingSpinner fullScreen text="Loading techniques..." />
      </Layout>
    );
  }
  
  return (
    <Layout>
      <TechniquesContainer>
        <PageHeader>
          <PageTitle>Coping Techniques</PageTitle>
          <PageDescription>
            Discover evidence-based coping techniques to help manage stress, anxiety,
            and other challenging emotions. These practical strategies can be applied
            in your daily life to improve mental wellbeing.
          </PageDescription>
        </PageHeader>
        
        <FilterSection>
          <div>
            <FilterLabel>Filter by concern:</FilterLabel>
            {tags.slice(0, 8).map(tag => (
              <Button 
                key={tag}
                size="small" 
                variant={selectedTag === tag ? 'primary' : 'outline'}
                onClick={() => handleTagChange(tag)}
              >
                {tag.replace('_', ' ')}
              </Button>
            ))}
          </div>
          
          {selectedTag && (
            <Button 
              size="small" 
              variant="text"
              onClick={() => setSelectedTag('')}
            >
              Clear Filters
            </Button>
          )}
        </FilterSection>
        
        {techniques.length > 0 ? (
          <TechniquesGrid>
            {techniques.map((item) => {
              const technique = item.technique || {};
              const tags = item.tags?.map(t => t.tag) || [];
              
              return (
                <TechniqueCard key={item.id}>
                  <TechniqueHeader>
                    <TechniqueTitle>{technique.title}</TechniqueTitle>
                  </TechniqueHeader>
                  
                  <TechniqueContent>
                    <TechniqueDescription>
                      {technique.description?.length > 180 
                        ? `${technique.description.substring(0, 180)}...` 
                        : technique.description}
                    </TechniqueDescription>
                    
                    {technique.benefits && technique.benefits.length > 0 && (
                      <>
                        <h4>Key Benefits:</h4>
                        <BenefitsList>
                          {technique.benefits.slice(0, 2).map((benefit, index) => (
                            <BenefitItem key={index}>{benefit}</BenefitItem>
                          ))}
                          {technique.benefits.length > 2 && (
                            <BenefitItem>And more...</BenefitItem>
                          )}
                        </BenefitsList>
                      </>
                    )}
                    
                    <TechniqueTags>
                      {tags.map((tag, index) => (
                        <TechniqueTag key={index}>
                          {tag.replace('_', ' ')}
                        </TechniqueTag>
                      ))}
                    </TechniqueTags>
                    
                    <TechniqueFooter>
                      <Button onClick={() => openTechniqueModal(item)}>
                        View Technique
                      </Button>
                    </TechniqueFooter>
                  </TechniqueContent>
                </TechniqueCard>
              );
            })}
          </TechniquesGrid>
        ) : (
          <NoResults>
            <h3>No techniques found</h3>
            <p>Try adjusting your filters or check back later for new content.</p>
            {selectedTag && (
              <Button 
                onClick={() => setSelectedTag('')}
                variant="outline"
              >
                Clear Filters
              </Button>
            )}
          </NoResults>
        )}
        
        {totalPages > 1 && (
          <Pagination>
            <Button 
              variant="outline" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              Previous
            </Button>
            
            <PageNumber>
              Page {currentPage} of {totalPages}
            </PageNumber>
            
            <Button 
              variant="outline" 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            >
              Next
            </Button>
          </Pagination>
        )}
        
        {/* Technique Detail Modal */}
        {selectedTechnique && (
          <ModalBackdrop onClick={closeTechniqueModal}>
            <ModalContent onClick={e => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>{selectedTechnique.technique?.title}</ModalTitle>
              </ModalHeader>
              
              <ModalBody>
                <h3>Description</h3>
                <p>{selectedTechnique.technique?.description}</p>
                
                <h3>Instructions</h3>
                <InstructionsSection>
                  <p>{selectedTechnique.technique?.instructions}</p>
                </InstructionsSection>
                
                <h3>Benefits</h3>
                <BenefitsList>
                  {selectedTechnique.technique?.benefits?.map((benefit, index) => (
                    <BenefitItem key={index}>{benefit}</BenefitItem>
                  ))}
                </BenefitsList>
                
                {selectedTechnique.technique?.contraindications?.length > 0 && (
                  <>
                    <h3>Contraindications</h3>
                    <ContraindicationsSection>
                      <p>This technique may not be suitable for everyone. Consider the following:</p>
                      <ul>
                        {selectedTechnique.technique?.contraindications?.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </ContraindicationsSection>
                  </>
                )}
                
                <h3>Tags</h3>
                <TechniqueTags>
                  {selectedTechnique.tags?.map(t => (
                    <TechniqueTag key={t.id}>
                      {t.tag.replace('_', ' ')}
                    </TechniqueTag>
                  ))}
                </TechniqueTags>
              </ModalBody>
              
              <ModalFooter>
                <Button variant="outline" onClick={closeTechniqueModal}>
                  Close
                </Button>
                <Button>
                  Save to Favorites
                </Button>
              </ModalFooter>
            </ModalContent>
          </ModalBackdrop>
        )}
      </TechniquesContainer>
    </Layout>
  );
};

export default Techniques;