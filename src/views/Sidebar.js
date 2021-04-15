import React from 'react'

// external components
import { ProSidebar, SidebarHeader, Menu, MenuItem, SubMenu, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import { Button, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import sidebarImage from '../assets/images/bg-sidebar.jpeg'

// internal components
import {
    Negative,
    GreyScales
} from '../filters'

const Sidebar = (props) => {

    // extracting properties
    const {
        // Variables
        firstImage, threshold, range, noiseReduction, addition,
        // Sets
       onSetResultImage, onSetRange, onSetNoiseReduction, onSetAddSub,
        // Methods
        onApplyGreyScale, onChangeThresholdColorFul, onChangeThresholdGreyScale, onApplyAddition,
        onApplyNoiseReduction, onApplySubtraction,
        } = props


    /**
     * 
     * @returns Icon (svg)
     */
    const menuIcon = () => {
        return <FontAwesomeIcon icon="filter" />
    }


    return (
        <div id="sidebar">
        <ProSidebar image={sidebarImage}>
            <SidebarHeader>
                <div className="sidebar-header">
                    <FontAwesomeIcon icon="camera-retro" className="icon" />
                    <p className="title">Processamento Digital de Imagens</p>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <Menu >
                    {/* Grey Scale */}
                    <SubMenu title="Tons de Cinza" icon={menuIcon()}  >
                        <MenuItem onClick={() => onSetResultImage(GreyScales.aritmeticAverage(firstImage))} icon={<FontAwesomeIcon icon="adjust" />}>Média Aritmética</MenuItem>
                        <SubMenu title="Média Ponderada" icon={<FontAwesomeIcon icon="adjust" />}>
                            <div className="range">
                                <p className="label">Red</p>
                                <Input type="number" name="range" id="exampleRange" maxLength="100" value={range.red} onChange={(e) => onSetRange({ ...range, red: parseInt(e.target.value) })} />
                                <p className="number">%</p>
                            </div>
                            <div className="range">
                                <p className="label">Green</p>
                                <Input type="number" name="range" id="exampleRange" maxLength="100" value={range.green} onChange={(e) => onSetRange({ ...range, green: parseInt(e.target.value) })} />
                                <p className="number">%</p>
                            </div>
                            <div className="range">
                                <p className="label">Blue</p>
                                <Input type="number" name="range" id="exampleRange" maxLength="100" value={range.blue} onChange={(e) => onSetRange({ ...range, blue: parseInt(e.target.value) })} />
                                <p className="number">%</p>
                            </div>
                            <div className="btn">
                                <Button onClick={() => onApplyGreyScale()}>Aplicar</Button>
                            </div>
                        </SubMenu>
                    </SubMenu>
                    
                    {/* Negative */}
                    <MenuItem onClick={() => onSetResultImage(Negative(firstImage))} icon={menuIcon()}>Negativa</MenuItem>
                    
                    {/* Threshold */}
                    <SubMenu title="Limiarização" icon={menuIcon()}  >
                        <div className="title">
                            <p>Em Imagem Colorida</p>
                        </div>
                        <div className="range">
                            <Input
                                type="range"
                                name="range"
                                id="exampleRange"
                                className="limiar"
                                maxLength={255}
                                max={255}
                                value={threshold.colorful}
                                onChange={(e) => onChangeThresholdColorFul(parseInt(e.target.value))}
                                onClick={(e) => onChangeThresholdColorFul(parseInt(e.target.value))}

                            />
                            <p className="number">{threshold.colorful}</p>
                        </div>
                        <div className="title">
                            <p>Em Escala de Cinza</p>
                        </div>
                        <div className="range">
                            <Input
                                type="range"
                                name="range"
                                id="exampleRange"
                                className="limiar"
                                maxLength={255}
                                max={255}
                                value={threshold.greyScale}
                                onChange={(e) => onChangeThresholdGreyScale(parseInt(e.target.value))}
                                onClick={(e) => onChangeThresholdGreyScale(parseInt(e.target.value))}
                            />
                            <p className="number">{threshold.greyScale}</p>
                        </div>
                    </SubMenu>
                     
                     {/* Noise Reduction */}
                     <SubMenu title="Redução de Ruidos" icon={menuIcon()} >
                        <div className="noise-reduction-item">
                            <div className="title">
                                <p>vizinhanca</p>
                            </div>
                            <div className="content">
                                <div className="buttons">
                                    <Button onClick={() => onSetNoiseReduction({
                                        ...noiseReduction, neighborhood:
                                            { ...noiseReduction.neighborhood, diagonal: !noiseReduction.neighborhood.diagonal }
                                    })}
                                        className={!!noiseReduction.neighborhood.diagonal ? "active" : ""}
                                    >
                                        Diagonal
                                    </Button>
                                    <Button onClick={() => onSetNoiseReduction({
                                        ...noiseReduction, neighborhood:
                                            { ...noiseReduction.neighborhood, linear: !noiseReduction.neighborhood.linear }
                                    })}
                                        className={!!noiseReduction.neighborhood.linear ? "active" : ""}
                                    >
                                        Linear
                                    </Button>
                                </div>
                                <div className="filter-one">
                                    <div className="line">
                                        <FontAwesomeIcon className={!!noiseReduction.neighborhood.diagonal ? "dark" : ""} icon="square" />
                                        <FontAwesomeIcon className={!!noiseReduction.neighborhood.linear ? "dark" : ""} icon="square" />
                                        <FontAwesomeIcon className={!!noiseReduction.neighborhood.diagonal ? "dark" : ""} icon="square" />
                                    </div>
                                    <div className="line">
                                        <FontAwesomeIcon className={!!noiseReduction.neighborhood.linear ? "dark" : ""} icon="square" />
                                        <FontAwesomeIcon className="noise" icon="square" />
                                        <FontAwesomeIcon className={!!noiseReduction.neighborhood.linear ? "dark" : ""} icon="square" />
                                    </div>
                                    <div className="line">
                                        <FontAwesomeIcon className={!!noiseReduction.neighborhood.diagonal ? "dark" : ""} icon="square" />
                                        <FontAwesomeIcon className={!!noiseReduction.neighborhood.linear ? "dark" : ""} icon="square" />
                                        <FontAwesomeIcon className={!!noiseReduction.neighborhood.diagonal ? "dark" : ""} icon="square" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="noise-reduction-item">
                            <div className="title">
                                <p>Filtro</p>
                            </div>
                            <div className="btn-filter" >
                                <Button onClick={() => onSetNoiseReduction({ ...noiseReduction, filter: "média" })}
                                    className={noiseReduction.filter === "média" ? "active" : ""}
                                >
                                    Média
                                </Button>
                                <Button onClick={() => onSetNoiseReduction({ ...noiseReduction, filter: "mediana" })}
                                    className={noiseReduction.filter === "mediana" ? "active" : ""}
                                >
                                    Mediana
                                </Button>
                            </div>
                        </div>
                        <div className="btn">
                            <Button onClick={() => onApplyNoiseReduction()}
                                disabled={(noiseReduction.neighborhood.diagonal || noiseReduction.neighborhood.linear) ? false : true}
                            >
                                Aplicar
                            </Button>
                        </div>
                    </SubMenu>
                    
                    {/* Addition and Subtraction */}
                    <SubMenu title="Adição/Subtração" icon={menuIcon()} >
                        <div className="addition">
                            <div className="title">
                                <p>Porcentagem de Imagens</p>
                            </div>
                            <div className="title">
                                <p className="first">Imagem 1</p>
                                <p className="second">Imagem 2</p>
                            </div>
                            <div className="range">
                                <p className="number">{100 - addition.percent}</p>


                                <Input
                                    type="range"
                                    name="range"
                                    id="exampleRange"
                                    className="limiar"
                                    maxLength={100}
                                    max={100}
                                    value={addition.percent}
                                    onChange={(e) => onSetAddSub({ ...addition, percent: e.target.value })}

                                />
                                <p className="number">{addition.percent}</p>
                            </div>
                            <div className="btn">
                                <Button onClick={() => onApplyAddition()}
                                    className={addition.filter === "addition" ? "active" : ""}
                                >
                                    Adição
                            </Button>
                                <Button onClick={() => onApplySubtraction()}
                                    className={addition.filter === "subtraction" ? "active" : ""}
                                >
                                    Subtração
                            </Button>
                            </div>
                        </div>
                    </SubMenu> 
                </Menu>
            </SidebarContent>
            <SidebarFooter>
                <p className="rights">Developed by Wilson Medeiros Jr.</p>
            </SidebarFooter>
        </ProSidebar>
    </div>
    )
}

export default Sidebar