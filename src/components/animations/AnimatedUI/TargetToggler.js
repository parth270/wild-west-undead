import { useState } from 'react'
import AniDiv from './AniDiv'

const TargetToggler = () => {
  const [showAniDiv, setShowAniDiv] = useState(false) // State to track whether AniDiv should be shown

  const targetTogglerStyles = {
    container: {
      width: '25px',
      height: '25px',
      border: 'dashed 2px white',
      padding: '20px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      cursor: 'pointer', // Add cursor pointer to indicate clickability
    },
    target: {
      color: 'white',
    },
  }

  const handleTargetClick = () => {
    setShowAniDiv(true)
  }

  const handleCloseAniDiv = () => {
    setShowAniDiv(false)
  }

  return (
    <>
      <div>
        <h2>Something Goes Here</h2>
      </div>
      <div>
        <div style={targetTogglerStyles.container} onClick={handleTargetClick}>
          <div style={targetTogglerStyles.target}>+</div>
        </div>
        {showAniDiv && <AniDiv onClose={handleCloseAniDiv} />}
        {/* Render AniDiv only when showAniDiv is true */}
      </div>
    </>
  )
}

export default TargetToggler
