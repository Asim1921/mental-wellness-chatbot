import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useApi from '../hooks/useApi';

const ExercisesContainer = styled.div`
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

const ExercisesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const ExerciseCard = styled.div`
  background-color: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: ${({ theme }) => theme.transitions.medium};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.lg};
  }
`;

const ExerciseHeader = styled.div`
  background: linear-gradient(to right, ${({ theme }) => theme.colors.secondary}, ${({ theme }) => theme.colors.secondaryLight});
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const ExerciseTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

const ExerciseDuration = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ExerciseContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ExerciseDescription = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const ExerciseTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ExerciseTag = styled.span`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textLight};
`;

const DifficultyBadge = styled.span`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  background-color: ${({ theme, level }) => {
    switch (level) {
      case 'beginner':
        return `${theme.colors.success}20`;
      case 'intermediate':
        return `${theme.colors.warning}20`;
      case 'advanced':
        return `${theme.colors.error}20`;
      default:
        return theme.colors.background;
    }
  }};
  
  color: ${({ theme, level }) => {
    switch (level) {
      case 'beginner':
        return theme.colors.success;
      case 'intermediate':
        return theme.colors.warning;
      case 'advanced':
        return theme.colors.error;
      default:
        return theme.colors.text;
    }
  }};
`;

const ExerciseFooter = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

// Exercise detail modal
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
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.boxShadow.xl};
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  background: linear-gradient(to right, ${({ theme }) => theme.colors.secondary}, ${({ theme }) => theme.colors.secondaryLight});
  padding: ${({ theme }) => theme.spacing.lg};
  position: sticky;
  top: 0;
  z-index: 1;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
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

const StepsList = styled.ol`
  margin: ${({ theme }) => theme.spacing.md} 0;
  padding-left: ${({ theme }) => theme.spacing.xl};
`;

const StepItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.6;
`;

const Exercises = () => {
  const { loading, error, getWellnessContent } = useApi();
  const [exercises, setExercises] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    const fetchExercises = async () => {
      const filters = { contentType: 'exercise' };
      
      if (selectedDifficulty) {
        filters.difficulty = selectedDifficulty;
      }
      
      const response = await getWellnessContent('exercise', null, currentPage);
      
      if (!response.error) {
        setExercises(response.data || []);
        setTotalPages(response.totalPages || 1);
      }
    };
    
    fetchExercises();
  }, [getWellnessContent, selectedDifficulty, currentPage]);
  
  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty === selectedDifficulty ? '' : difficulty);
    setCurrentPage(1);
  };
  
  const openExerciseModal = (exercise) => {
    setSelectedExercise(exercise);
  };
  
  const closeExerciseModal = () => {
    setSelectedExercise(null);
  };
  
  if (loading && exercises.length === 0) {
    return (
      <Layout>
        <LoadingSpinner fullScreen text="Loading exercises..." />
      </Layout>
    );
  }
  
  return (
    <Layout>
      <ExercisesContainer>
        <PageHeader>
          <PageTitle>Mindfulness Exercises</PageTitle>
          <PageDescription>
            Discover a variety of guided exercises designed to help reduce stress,
            improve focus, and enhance your overall mental wellbeing.
          </PageDescription>
        </PageHeader>
        
        <FilterSection>
          <div>
            <FilterLabel>Difficulty:</FilterLabel>
            <Button 
              size="small" 
              variant={selectedDifficulty === 'beginner' ? 'primary' : 'outline'}
              onClick={() => handleDifficultyChange('beginner')}
            >
              Beginner
            </Button>
            <Button 
              size="small" 
              variant={selectedDifficulty === 'intermediate' ? 'primary' : 'outline'}
              onClick={() => handleDifficultyChange('intermediate')}
            >
              Intermediate
            </Button>
            <Button 
              size="small" 
              variant={selectedDifficulty === 'advanced' ? 'primary' : 'outline'}
              onClick={() => handleDifficultyChange('advanced')}
            >
              Advanced
            </Button>
          </div>
          
          {selectedDifficulty && (
            <Button 
              size="small" 
              variant="text"
              onClick={() => setSelectedDifficulty('')}
            >
              Clear Filters
            </Button>
          )}
        </FilterSection>
        
        {exercises.length > 0 ? (
          <ExercisesGrid>
            {exercises.map((item) => {
              const exercise = item.exercise || {};
              const tags = item.tags?.map(t => t.tag) || [];
              
              return (
                <ExerciseCard key={item.id}>
                  <ExerciseHeader>
                    <ExerciseTitle>{exercise.title}</ExerciseTitle>
                    <ExerciseDuration>
                      <span>⏱️</span> {exercise.duration} minutes
                    </ExerciseDuration>
                  </ExerciseHeader>
                  
                  <ExerciseContent>
                    <DifficultyBadge level={exercise.difficulty || 'beginner'}>
                      {exercise.difficulty ? exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1) : 'Beginner'}
                    </DifficultyBadge>
                    
                    <ExerciseDescription>
                      {exercise.description?.length > 120 
                        ? `${exercise.description.substring(0, 120)}...` 
                        : exercise.description}
                    </ExerciseDescription>
                    
                    <ExerciseTags>
                      {tags.map((tag, index) => (
                        <ExerciseTag key={index}>
                          {tag.replace('_', ' ')}
                        </ExerciseTag>
                      ))}
                    </ExerciseTags>
                    
                    <ExerciseFooter>
                      <Button onClick={() => openExerciseModal(item)}>
                        View Exercise
                      </Button>
                    </ExerciseFooter>
                  </ExerciseContent>
                </ExerciseCard>
              );
            })}
          </ExercisesGrid>
        ) : (
          <NoResults>
            <h3>No exercises found</h3>
            <p>Try adjusting your filters or check back later for new content.</p>
            {selectedDifficulty && (
              <Button 
                onClick={() => setSelectedDifficulty('')}
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
        
        {/* Exercise Detail Modal */}
        {selectedExercise && (
          <ModalBackdrop onClick={closeExerciseModal}>
            <ModalContent onClick={e => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>{selectedExercise.exercise?.title}</ModalTitle>
                <ExerciseDuration>
                  <span>⏱️</span> {selectedExercise.exercise?.duration} minutes | 
                  <DifficultyBadge level={selectedExercise.exercise?.difficulty || 'beginner'} style={{ marginLeft: '8px' }}>
                    {selectedExercise.exercise?.difficulty 
                      ? selectedExercise.exercise.difficulty.charAt(0).toUpperCase() + selectedExercise.exercise.difficulty.slice(1) 
                      : 'Beginner'}
                  </DifficultyBadge>
                </ExerciseDuration>
              </ModalHeader>
              
              <ModalBody>
                <h3>Description</h3>
                <p>{selectedExercise.exercise?.description}</p>
                
                <h3>Steps</h3>
                <StepsList>
                  {selectedExercise.exercise?.steps?.map((step, index) => (
                    <StepItem key={index}>{step}</StepItem>
                  ))}
                </StepsList>
                
                <h3>Benefits</h3>
                <ul>
                  <li>Reduces stress and anxiety</li>
                  <li>Improves focus and concentration</li>
                  <li>Enhances self-awareness</li>
                  <li>Promotes emotional wellbeing</li>
                </ul>
                
                <h3>Tags</h3>
                <ExerciseTags>
                  {selectedExercise.tags?.map(t => (
                    <ExerciseTag key={t.id}>
                      {t.tag.replace('_', ' ')}
                    </ExerciseTag>
                  ))}
                </ExerciseTags>
              </ModalBody>
              
              <ModalFooter>
                <Button variant="outline" onClick={closeExerciseModal}>
                  Close
                </Button>
                <Button>
                  Start Exercise
                </Button>
              </ModalFooter>
            </ModalContent>
          </ModalBackdrop>
        )}
      </ExercisesContainer>
    </Layout>
  );
};

export default Exercises;