import React, {Component} from 'react';
import styled from 'styled-components';

class ListItem extends Component {
    render() {
        const Title = styled.div`
            font-size: 16px;
        `;

        const Subtitle = styled.div`
            font-size: 12px;
            font-weight: 300;
            margin: 0;
        `;

        const Arrow = styled.div`
            position: relative;
            right: ${this.props.active ? '-24px' : '0'};
            width: ${this.props.active ? '16px' : '12px'};
            height: ${this.props.active ? '16px' : '12px'};
            border-top: 1px solid #ccc;
            border-right: 1px solid #ccc;
            background: ${this.props.active && '#f7f7f7'};
            border-color: ${this.props.active && '#f7f7f7'};
            box-shadow: ${this.props.active && '3px -2px 4px 0 rgba(0,0,0,0.1)'};
            transform: rotate(45deg);
            transition: all 0.2s;
        `;

        const Wrapper = styled.div`
            padding: 16px;
            ${'' /* border-top: 1px solid #eee; */}
            border-bottom: 1px solid #eee;
            text-align: left;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: ${this.props.active ? '#F7F7F7' : ''};
            border-left: 8px solid ${this.props.selected ? '#589DC7' : 'transparent'};
            &:hover {
                background: #F7F7F7;
                cursor: pointer;
            }
            &:hover ${Arrow} {
                right: ${this.props.active ? '' : '-4px'};
            }
        `;

        return (
            <Wrapper onClick={() => this.props.onClick(this.props.id)}>
                <div>
                    <Title>{this.props.title}</Title>
                    <Subtitle>{this.props.subtitle}</Subtitle>
                </div>
                <Arrow></Arrow>
            </Wrapper>
        );
    }
}

export default ListItem;