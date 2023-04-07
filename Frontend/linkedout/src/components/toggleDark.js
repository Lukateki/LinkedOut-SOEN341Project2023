import React from 'react';

export default function ToggleDark(props) {
  return (
    <div>
        <div class="wrapper">
            <label class="switch">
                <input 
                type="checkbox"
                onClick={
                    () => {
                        props.toggleDark();
                    }
                  }
                />
                <span class="slider round"></span>         
            </label>
        </div>
    </div>
  );
}