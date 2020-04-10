import React, { Component } from 'react';
import './App.css';

const skill_names = [
  "Blade",
  "Blunt",
  "Hand to Hand",
  "Armorer",
  "Block",
  "Heavy Armor",
  "Athletics",
  "Acrobatics",
  "Light Armor",
  "Security",
  "Sneak",
  "Marksman",
  "Mercantile",
  "Speechcraft",
  "Illusion",
  "Alchemy",
  "Conjuration",
  "Mysticism",
  "Alteration",
  "Destruction",
  "Restoration",
]

const attribute_names = [
  "Strength",
  "Endurance",
  "Speed",
  "Agility",
  "Personality",
  "Intelligence",
  "Willpower",
]

class App extends Component {
  state = {
    skills: [],
  }
  
  componentDidMount(){
    let stored_skills = localStorage.getItem('skills');
    if(stored_skills){
      const x = JSON.parse(stored_skills);
      this.setState({skills: x});
    } else {
      console.log('empty storage, creating skills array');
      this.createSkills();
    }
  }

  createSkills = () => {
    let arr = [];
    let i = 0;
    for(i; i<21; i++){
      arr.push({name: skill_names[i], count: 0, major: false});
    }
    this.setState({skills: arr});
    let x = JSON.stringify(arr);
    localStorage.setItem('skills', x);
  }

  incrementSkill = (index) => {
    let skills_copy = this.state.skills;
    skills_copy[index].count++;
    this.setState({skills: skills_copy});

    let x = JSON.stringify(skills_copy);
    localStorage.setItem('skills', x);
  }

  toggleMajor = (index) => {
    let skills_copy = this.state.skills;
    skills_copy[index].major = !skills_copy[index].major;
    this.setState({skills: skills_copy});

    let x = JSON.stringify(skills_copy);
    localStorage.setItem('skills', x);
  }

  resetSkills = () => {
    let skills_copy = this.state.skills;
    let i = 0;
    for(i; i<skills_copy.length; i++){
      skills_copy[i].count = 0;
    }
    this.setState({skills: skills_copy});

    let x = JSON.stringify(skills_copy);
    localStorage.setItem('skills', x);
  }

  render() {

    if(this.state.skills.length){
      var total_str = this.state.skills[0].count + this.state.skills[1].count + this.state.skills[2].count;
      var total_end = this.state.skills[3].count + this.state.skills[4].count + this.state.skills[5].count;
      var total_spd = this.state.skills[6].count + this.state.skills[7].count + this.state.skills[8].count;
      var total_agl = this.state.skills[9].count + this.state.skills[10].count + this.state.skills[11].count;
      var total_per = this.state.skills[12].count + this.state.skills[13].count + this.state.skills[14].count;
      var total_int = this.state.skills[15].count + this.state.skills[16].count + this.state.skills[17].count;
      var total_wil = this.state.skills[18].count + this.state.skills[19].count + this.state.skills[20].count;

      let i = 0;
      var total_major = 0;
      for(i; i<this.state.skills.length; i++){
        if(this.state.skills[i].major){
          total_major += this.state.skills[i].count;
        }
      }
    }

    return (
      <div>
        <div className='root'>
          <div className='skills-grid'>
            {this.state.skills.map((x, index) => {
              return (
                <div key={x.name}>
                  <span>{x.name}</span>
                  <span>{x.count}</span>
                  <span onClick={() => this.toggleMajor(index)} >{x.major ? 'Major' : 'Minor'}</span>
                  <span onClick={() => this.incrementSkill(index)} >+</span>
                </div>
              )
            })}
          </div>
          <div className='attributes'>
            <div>
              <span>Strength</span>
              <span>{total_str}</span>
            </div>
            <div>
              <span>Endurance</span>
              <span>{total_end}</span>
            </div>
            <div>
              <span>Speed</span>
              <span>{total_spd}</span>
            </div>
            <div>
              <span>Agility</span>
              <span>{total_agl}</span>
            </div>
            <div>
              <span>Personality</span>
              <span>{total_per}</span>
            </div>
            <div>
              <span>Intelligence</span>
              <span>{total_int}</span>
            </div>
            <div>
              <span>Willpower</span>
              <span>{total_wil}</span>
            </div>
          </div>
        </div>
        <div>
          <span>Major Skills Increased</span>
          <span>{total_major}</span>
        </div>
        <div>
          <span onClick={() => this.resetSkills()}>reset</span>
        </div>
      </div>
    );
  } 
}

export default App;
